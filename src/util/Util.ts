import equal from 'fast-deep-equal/es6';

export interface ObjectDifference<T> {
    deletedFields: T;
    unchangedFields: T;
    modifiedFields: T;
    newFields: T;
    
    oldObject: T;
    newObject: T;
}

export function getDiffBetweenObjects<T extends object>(oldObject: T, newObject: T): ObjectDifference<T> {
    const deletedFields: T = {} as T;
    const unchangedFields: T = {} as T;
    const modifiedFields: T = {} as T;
    const newFields: T = {} as T;
    
    for (const [key, value] of Object.entries(oldObject)) {
        if (newObject.hasOwnProperty(key)) {
            if (equal((oldObject as any)[key], (newObject as any)[key])) {
                (unchangedFields as any)[key] = value;
            } else {
                (modifiedFields as any)[key] = (newObject as any)[key];
            }
        } else {
            (deletedFields as any)[key] = value;
        }
    }
    
    for (const [key, value] of Object.entries(newObject)) {
        if (!oldObject.hasOwnProperty(key)) {
            (newFields as any)[key] = value;
        }
    }
    
    return { deletedFields, unchangedFields, modifiedFields, newFields, oldObject, newObject };
}

