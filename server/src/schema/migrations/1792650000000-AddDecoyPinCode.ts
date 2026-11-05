import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE "user" ADD "decoyPinCode" character varying;`.execute(db);
  await sql`ALTER TABLE "session" ADD "isDecoy" boolean NOT NULL DEFAULT false;`.execute(db);
  await sql`ALTER TABLE "asset" ADD "isDecoy" boolean NOT NULL DEFAULT false;`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE "asset" DROP COLUMN "isDecoy";`.execute(db);
  await sql`ALTER TABLE "session" DROP COLUMN "isDecoy";`.execute(db);
  await sql`ALTER TABLE "user" DROP COLUMN "decoyPinCode";`.execute(db);
}
