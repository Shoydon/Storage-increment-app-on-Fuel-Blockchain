// Transpiled from Solidity using charcoal. Generated code may be incorrect or unoptimal.
contract;

abi Counter {
    #[storage(read)]
    fn get() -> u64;

    #[storage(read, write)]
    fn increment();

    #[storage(read, write)]
    fn set_value(_new_value: u64);
}

storage {
    value: u64 = 0,
}

impl Counter for Contract {
    #[storage(read)]
    fn get() -> u64 {
        storage.value.read()
    }

    #[storage(read, write)]
    fn increment() {
        storage.value.write(storage.value.read() + 1);
    }

    #[storage(read, write)]
    fn set_value(_new_value: u64) {
        storage.value.write(_new_value);
    }
}

