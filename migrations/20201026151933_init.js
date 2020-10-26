const teamUsersConstants = require("../constants/team-users-mapping");
const projectRequests = require("../constants/project-requests");

exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("verification_token").nullable();
      table.boolean("is_verified").notNullable().default(false);
      table.boolean("is_active").notNullable().default(true);
      table.timestamps(true, true);
    })
    .createTable("profiles", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.string("name").notNullable();
      table.integer("user_id").unique().notNullable();
      table.boolean("is_active").notNullable().default(true);

      table.timestamps(true, true);

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("teams", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.text("slug").notNullable();
      table.string("name").notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.integer("created_by").notNullable();

      table.timestamps(true, true);

      table
        .foreign("created_by")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("teams_users_mapping", function (table) {
      table.integer("team_id").notNullable();
      table.integer("user_id").notNullable();
      table.enu("role", teamUsersConstants.roles);
      table.boolean("is_active").notNullable().default(true);

      table.timestamps(true, true);

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("team_id")
        .references("teams.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("billing", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.enu("plan", ["hobby", "team"]).notNullable();
      table.integer("period_in_months").nullable();
      table.integer("payment_buffer_in_days").notNullable().defaultTo(10);
      table.boolean("trial").nullable();
      table.date("cancelation").nullable();
      table.boolean("is_active").notNullable().default(true);

      table.integer("user_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("payment_methods", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.string("provider").notNullable();
      table.string("card_last_4").nullable();
      table.string("card_provider").nullable();
      table.boolean("is_active").notNullable().default(true);

      table.integer("user_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("transactions", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.text("transaction_id").notNullable();
      table.date("transaction_date").notNullable();
      table.text("transaction_hash").notNullable();
      table
        .enu("status", ["paid", "processing", "pending", "not-started"])
        .defaultTo("not-started")
        .notNullable();
      table.integer("seats").notNullable();
      table.decimal("price_per_seat", 25, 10).notNullable();
      table.decimal("total_amount", 25, 10).notNullable();
      table.integer("payment_method_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("payment_method_id")
        .references("payment_methods.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("projects", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.string("name").notNullable();
      table.text("description").notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.bigInteger("time_spent").notNullable().default(0);
      table.integer("team_id").notNullable();
      table.integer("user_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("team_id")
        .references("teams.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("project_user_mapping", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.enu("role", ["member", "owner"]).notNullable();
      table.integer("user_id").notNullable();
      table.integer("project_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("project_id")
        .references("projects.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("tasks", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.text("name").notNullable();
      table.bigInteger("time_spent").notNullable().default(0);
      table.boolean("is_active").notNullable().default(true);
      table.integer("project_id").nullable();

      table.integer("user_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("project_id")
        .references("projects.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("access_tokens", function (table) {
      table.increments("id").primary().unique().notNullable();
      table.text("token").unique().notNullable();
      table.boolean("is_verified").defaultTo("false").notNullable();
      table.timestamps(true, true);
    })
    .createTable("project_requests", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.text("title").notNullable();
      table.text("description").notNullable();
      table.enu("type", projectRequests.types).notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.integer("project_id").notNullable();
      table.timestamps(true, true);

      table
        .foreign("project_id")
        .references("projects.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("project_requests_user_mapping", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.integer("project_request_id").notNullable();
      table.integer("user_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("project_request_id")
        .references("project_requests.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .foreign("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.string("content").notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.integer("from_user_id").notNullable();

      table.timestamps(true, true);
      table
        .foreign("from_user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("project_requests_comments_mapping", function (table) {
      table.increments("id").unique().primary().notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.integer("project_request_id").notNullable();
      table.integer("comment_id").notNullable();

      table.timestamps(true, true);

      table
        .foreign("project_request_id")
        .references("project_requests.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table
        .foreign("comment_id")
        .references("comments.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_requests_comments_mapping")
    .dropTableIfExists("comments")
    .dropTableIfExists("project_requests_user_mapping")
    .dropTableIfExists("project_requests")
    .dropTableIfExists("access_tokens")
    .dropTableIfExists("tasks")
    .dropTableIfExists("project_user_mapping")
    .dropTableIfExists("projects")
    .dropTableIfExists("transactions")
    .dropTableIfExists("payment_methods")
    .dropTableIfExists("billing")
    .dropTableIfExists("teams_users_mapping")
    .dropTableIfExists("teams")
    .dropTableIfExists("profiles")
    .dropTableIfExists("users");
};
