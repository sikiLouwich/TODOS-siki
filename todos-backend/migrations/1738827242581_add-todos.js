/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {pgm.createTable('todos', {
  id: 'uuid',
  name: { type: 'VARCHAR(255)', notNull: true },
  date:{type:'timestamp without time zone',notNull:true},
  is_finished:{type:'boolean',default:false}
}, { ifNotExists: true })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {pgm.dropTable('todos')};
