import { supabase } from "@/integrations/supabase/client";

export const xpForLevel = (level: number) => 100 * level * level;
export const levelFromXp = (xp: number) => {
  let lvl = 1;
  while (xp >= xpForLevel(lvl)) lvl++;
  return lvl;
};

export async function awardXp(userId: string, amount: number) {
  const today = new Date().toISOString().slice(0, 10);
  const { data: existing } = await supabase
    .from("student_xp")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (!existing) {
    const level = levelFromXp(amount);
    await supabase.from("student_xp").insert({
      user_id: userId,
      xp: amount,
      level,
      current_streak: 1,
      longest_streak: 1,
      last_active_date: today,
    });
    return { xp: amount, level, streak: 1, leveledUp: level > 1 };
  }

  const newXp = existing.xp + amount;
  const newLevel = levelFromXp(newXp);
  const last = existing.last_active_date;
  let streak = existing.current_streak ?? 0;
  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    streak = last === yesterday ? streak + 1 : 1;
  }
  const longest = Math.max(existing.longest_streak ?? 0, streak);

  await supabase
    .from("student_xp")
    .update({
      xp: newXp,
      level: newLevel,
      current_streak: streak,
      longest_streak: longest,
      last_active_date: today,
    })
    .eq("user_id", userId);

  return { xp: newXp, level: newLevel, streak, leveledUp: newLevel > existing.level };
}

export async function checkAndAwardBadges(userId: string) {
  const { data: xpRow } = await supabase
    .from("student_xp").select("*").eq("user_id", userId).maybeSingle();
  const { data: badges } = await supabase.from("badges").select("*");
  const { data: owned } = await supabase
    .from("user_badges").select("badge_id").eq("user_id", userId);
  const ownedIds = new Set((owned ?? []).map((b) => b.badge_id));

  const { count: quizCount } = await supabase
    .from("quiz_attempts").select("*", { count: "exact", head: true })
    .eq("user_id", userId).not("submitted_at", "is", null);

  const { data: perfect } = await supabase
    .from("quiz_attempts").select("id").eq("user_id", userId).eq("percentage", 100).limit(1);

  const newAwards: { slug: string; name: string }[] = [];
  for (const b of badges ?? []) {
    if (ownedIds.has(b.id)) continue;
    const c = b.criteria as any;
    let earned = false;
    if (c.quizzes && (quizCount ?? 0) >= c.quizzes) earned = true;
    if (c.perfect && perfect && perfect.length > 0) earned = true;
    if (c.streak && (xpRow?.current_streak ?? 0) >= c.streak) earned = true;
    if (c.xp && (xpRow?.xp ?? 0) >= c.xp) earned = true;
    if (earned) {
      await supabase.from("user_badges").insert({ user_id: userId, badge_id: b.id });
      newAwards.push({ slug: b.slug, name: b.name });
    }
  }
  return newAwards;
}
