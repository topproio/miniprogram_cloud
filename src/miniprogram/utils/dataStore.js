class DataStore{
    static getInstance() {
        if (!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }

    constructor() {
        this.map = new Map();
    }

    put(key, Value) {
        if (typeof Value === 'function') { // 保存构造函数实例
            Value = new Value();
        }
        this.map.set(key, Value);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    destroy() {
        this.map.clear();
    }
}

export default DataStore.getInstance();
