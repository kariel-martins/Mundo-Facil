ALTER TABLE "email_verifications" RENAME COLUMN "exipres_At" TO "expires_At";--> statement-breakpoint
ALTER TABLE "email_verifications" RENAME COLUMN "created_at" TO "created_At";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_at" TO "created_At";--> statement-breakpoint
ALTER TABLE "email_verifications" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "email_verifications" ALTER COLUMN "consumer_At" DROP NOT NULL;