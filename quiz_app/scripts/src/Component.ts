class Component<Type>{
    internalState: Type;

    listener: () => void;

    constructor(_listener: () => void) {
        this.listener = _listener;
    }

    set value(state: Type) {
        if (state !== this.internalState) {
            this.internalState = state;
            this.listener();
        }
    }

    get value() {
        return this.internalState;
    }

};

export default Component;