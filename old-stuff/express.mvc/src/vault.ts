import { DTOType, VaultRecord, GenericClass } from './type';

type VaultKey = GenericClass | DTOType | Function;

const vault = new Map<VaultKey, VaultRecord>();

export const getVaultFor = (key: VaultKey): VaultRecord | undefined => {
    if (!vault.has(key)) {
        vault.set(key, {});
    }

    return vault.get(key);
};

export const hasVaultFor = (obj: VaultKey): boolean => vault.has(obj);

export const getVault = () => vault;
