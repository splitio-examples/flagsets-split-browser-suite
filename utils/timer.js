/**
 * Measure time duration
 *
 * @returns call duration() to return milliseconds after start
 */
export function Timer() {
    const start = Date.now();
    return {
        duration: () => Date.now() - start
    };
}