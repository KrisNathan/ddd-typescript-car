CREATE TABLE "car_sales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"car_id" uuid NOT NULL,
	"customer_id" uuid NOT NULL,
	"sales_person_id" uuid NOT NULL,
	"sale_date" timestamp DEFAULT now(),
	"negotiated_price" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"make" varchar(50) NOT NULL,
	"model" varchar(50) NOT NULL,
	"year" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(512) NOT NULL,
	"email" varchar(100) NOT NULL,
	"loyalty_points" integer DEFAULT 0,
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sales_persons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(512) NOT NULL,
	"cars_sold_count" integer DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "car_sales" ADD CONSTRAINT "car_sales_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_sales" ADD CONSTRAINT "car_sales_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "car_sales" ADD CONSTRAINT "car_sales_sales_person_id_sales_persons_id_fk" FOREIGN KEY ("sales_person_id") REFERENCES "public"."sales_persons"("id") ON DELETE restrict ON UPDATE no action;