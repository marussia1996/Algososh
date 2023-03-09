export const getFibonacciNumbers = (n: number, memo: Record<number, number> = {}): number =>{
    if (n in memo) {
        return memo[n];
    }
    if (n <= 2) {
        return 1;
    }
    memo[n] = getFibonacciNumbers(n - 1, memo) + getFibonacciNumbers(n - 2, memo);
    return memo[n];
};