DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "opentable_reservation_id" varchar(255);
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "reservations" ADD COLUMN "opentable_synced" boolean DEFAULT false NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;