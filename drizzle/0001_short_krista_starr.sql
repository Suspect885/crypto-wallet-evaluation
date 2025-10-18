CREATE TABLE `comments` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`userName` text,
	`content` text NOT NULL,
	`rating` varchar(20),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`id` varchar(64) NOT NULL,
	`userId` varchar(64) NOT NULL,
	`featureType` varchar(100) NOT NULL,
	`featureName` text NOT NULL,
	`rating` varchar(20) NOT NULL,
	`comment` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `ratings_id` PRIMARY KEY(`id`)
);
