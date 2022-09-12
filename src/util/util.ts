export function expToLevel(exp: number) {
    return Math.floor((exp / 20) ** (1 / 1.1));
}
  
export function percentToNextLevel(exp: number) {
    const level = (exp / 20) ** (1 / 1.1);
    return level - Math.floor(level);
}

export function levelToExp(level: number) {
    return Math.ceil(20 * level ** (1.1));
}