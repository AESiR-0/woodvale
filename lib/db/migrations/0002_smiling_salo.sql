DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "first_name" varchar(255) NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "last_name" varchar(255) NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "phone_country_code" varchar(5) DEFAULT '+1';
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "occasion" varchar(100);
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "restaurant_marketing_consent" boolean DEFAULT false NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD COLUMN "opentable_marketing_consent" boolean DEFAULT false NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "reservations" ADD COLUMN "text_updates_consent" boolean DEFAULT false NOT NULL;
EXCEPTION
 WHEN duplicate_column THEN null;
END $$;