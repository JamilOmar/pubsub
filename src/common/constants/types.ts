const TYPES = {
    DBClient: Symbol.for('DBClient'),
    UserService: Symbol.for('UserService'),
    TransformerStrategy: Symbol.for('TransformerStrategy'),
    TransformerService: Symbol.for('TransformerService'),
    BusService: Symbol.for('BusService'),
    WritterService: Symbol.for('WritterService'),
    WatcherService: Symbol.for('WatcherService'),
    WritterStrategy:Symbol.for('WritterStrategy'),
    UserRepository: Symbol.for("UserRepository")
};

export default TYPES;