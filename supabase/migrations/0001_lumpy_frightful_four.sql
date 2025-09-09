CREATE TABLE "post" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"tags" text
);

ALTER TABLE "post" ENABLE ROW LEVEL SECURITY;
