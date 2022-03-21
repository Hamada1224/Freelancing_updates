/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('users',knex => {
        knex.increments('i').primary()
        knex.bigint('user_id').index('user_id')
        knex.string('tags').notNullable()
        knex.boolean('send_tags_status').notNullable().defaultTo(false)
        knex.string('cached_text').nullable()
        knex.timestamps()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
