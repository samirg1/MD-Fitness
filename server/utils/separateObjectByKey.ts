type NestedObject<V> = { [key: string]: V | NestedObject<V> };

/**
 * Separate an object's keys into subkeys to make a nested object based on a function.
 * @param object The object to separate.
 * @param getNewKeys Function to map the previous key into all of its new subkeys. Default splits the key by "".
 * @returns The object with keys separated.
 */
function separateObjectByKey<V>(
    object: { [key: string]: V },
    getNewKeys: (key: string) => string[] = (key) => key.split("")
): NestedObject<V> {
    const expanded: NestedObject<V> = {};
    for (const [key, value] of Object.entries(object)) {
        const subkeys = getNewKeys(key);
        let current = expanded;
        for (let i = 0; i < subkeys.length; i++) {
            const subkey = subkeys[i];
            if (i === subkeys.length - 1) current[subkey] = value;
            else {
                if (!current[subkey]) current[subkey] = {};
                current = current[subkey] as NestedObject<V>;
            }
        }
    }
    return expanded;
}

export default separateObjectByKey;
