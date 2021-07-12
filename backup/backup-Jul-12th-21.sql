/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: blacklist_tokens
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `blacklist_tokens` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `token` varchar(255) NOT NULL,
  `ip` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categoryPosts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categoryPosts` (
  `postId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `categoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`postId`, `categoryId`),
  UNIQUE KEY `categoryPosts_postId_categoryId_unique` (`postId`, `categoryId`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `categoryPosts_ibfk_1` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `categoryPosts_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categorys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: categorys
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categorys` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `url_perma` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: follows
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `follows` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` varchar(255) NOT NULL,
  `who_follow` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id_follow` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `who_follow` (`who_follow`),
  KEY `id_follow` (`id_follow`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`who_follow`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`id_follow`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: json_postings
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `json_postings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_posting` varchar(255) NOT NULL,
  `encodeJSON` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: likes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `likes` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` varchar(255) NOT NULL,
  `id_posts` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `id_users` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_posts` (`id_posts`),
  KEY `id_users` (`id_users`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_posts`) REFERENCES `posts` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ownerCategorys
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ownerCategorys` (
  `categoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`categoryId`, `userId`),
  UNIQUE KEY `ownerCategorys_userId_categoryId_unique` (`categoryId`, `userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `ownerCategorys_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categorys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ownerCategorys_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: posts
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `posts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `thumbail_url` varchar(255) NOT NULL,
  `date_created` varchar(255) NOT NULL,
  `date_updated` varchar(255) NOT NULL,
  `url_perma` varchar(255) NOT NULL,
  `id_post_user` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_post_user` (`id_post_user`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`id_post_user`) REFERENCES `users` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tags
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tags` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) NOT NULL,
  `id_posts` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_posts` (`id_posts`),
  CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`id_posts`) REFERENCES `posts` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_photo` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `noTelp` text NOT NULL,
  `verification` varchar(255) NOT NULL DEFAULT 'false',
  `password` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: blacklist_tokens
# ------------------------------------------------------------

INSERT INTO
  `blacklist_tokens` (`id`, `token`, `ip`)
VALUES
  (
    '7a2758ba-551d-4379-9fe2-ccccef9df6f8',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJhZDcwMzg4MS0xZTVjLTQ5Y2QtODY4Ny1lMGRmOTVkOGExYjQiLCJpYXQiOjE2MjYwODU4NzUsImV4cCI6MTYyNjE3MjI3NX0.xBYAdpEGf3ZPJHfbrHfv3T7BSCKuV7DbZAKLw5c_5iY',
    '::1'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categoryPosts
# ------------------------------------------------------------

INSERT INTO
  `categoryPosts` (`postId`, `categoryId`)
VALUES
  (
    '02f3511a-579e-410a-97c7-e3ff5f8eaf5b',
    'c6ff3681-7f81-404d-9b4d-cf0bd590025c'
  );
INSERT INTO
  `categoryPosts` (`postId`, `categoryId`)
VALUES
  (
    '588e65b0-ec5b-49bb-a935-26a063b1e978',
    '61f8e33b-b549-4105-b63b-2604138d17ad'
  );
INSERT INTO
  `categoryPosts` (`postId`, `categoryId`)
VALUES
  (
    '693465f8-705c-4379-92d7-cdcfe3f8507f',
    '61f8e33b-b549-4105-b63b-2604138d17ad'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: categorys
# ------------------------------------------------------------

INSERT INTO
  `categorys` (`id`, `title`, `url_perma`)
VALUES
  (
    '61f8e33b-b549-4105-b63b-2604138d17ad',
    'Hello',
    'hello'
  );
INSERT INTO
  `categorys` (`id`, `title`, `url_perma`)
VALUES
  (
    'c6ff3681-7f81-404d-9b4d-cf0bd590025c',
    'php',
    'php'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: follows
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: json_postings
# ------------------------------------------------------------

INSERT INTO
  `json_postings` (`id`, `id_posting`, `encodeJSON`)
VALUES
  (
    '45eb99ce-8987-43af-8d23-84b961d37e3f',
    '693465f8-705c-4379-92d7-cdcfe3f8507f',
    'eyJ0aW1lIjoxNjI2MDg0NzA1NTgzLCJibG9ja3MiOlt7ImlkIjoib3hQb0pSYWZ5VCIsInR5cGUiOiJpbWFnZV9lbWJlZCIsImRhdGEiOnsidXJsIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NDI4MzEzNzEtMjliMGY3NGY5NzEzP2Nyb3A9ZW50cm9weSZhbXA7Y3M9c3JnYiZhbXA7Zm09anBnJmFtcDtpeGlkPU1ud3lNelkzTnpaOE1Id3hmSE5sWVhKamFId3pmSHhqYjJScGJtZDhaVzU4TUh4OGZId3hOakkyTURnME5qZ3gmYW1wO2l4bGliPXJiLTEuMi4xJmFtcDtxPTg1IiwiY2FwdGlvbiI6IiIsIndpdGhCb3JkZXIiOmZhbHNlLCJ3aXRoQmFja2dyb3VuZCI6ZmFsc2UsInN0cmV0Y2hlZCI6ZmFsc2UsInVuc3BsYXNoIjp7ImF1dGhvciI6IkZsb3JpYW4gT2xpdm8iLCJwcm9maWxlTGluayI6Imh0dHBzOi8vdW5zcGxhc2guY29tL0BmbG9yaWFub2x2In19fSx7ImlkIjoiVGZUcXNoS2FBMSIsInR5cGUiOiJwYXJhZ3JhcGgiLCJkYXRhIjp7InRleHQiOiJIZWxsbyBUcm9wZWVycyJ9LCJ0dW5lcyI6eyJ0ZXh0QWxpZ24iOnsiYWxpZ25tZW50IjoibGVmdCJ9fX1dLCJ2ZXJzaW9uIjoiMi4yMi4xIn0='
  );
INSERT INTO
  `json_postings` (`id`, `id_posting`, `encodeJSON`)
VALUES
  (
    '467407f8-dfa6-44c9-a7c1-8d47dd71861a',
    '588e65b0-ec5b-49bb-a935-26a063b1e978',
    'eyJ0aW1lIjoxNjI2MDgzMDYwNjI4LCJibG9ja3MiOlt7ImlkIjoiY183WjZQQmxJYyIsInR5cGUiOiJwYXJhZ3JhcGgiLCJkYXRhIjp7InRleHQiOiJoZWxsbyB3b3JsZCJ9LCJ0dW5lcyI6eyJ0ZXh0QWxpZ24iOnsiYWxpZ25tZW50IjoibGVmdCJ9fX1dLCJ2ZXJzaW9uIjoiMi4yMi4xIn0='
  );
INSERT INTO
  `json_postings` (`id`, `id_posting`, `encodeJSON`)
VALUES
  (
    '4bae4538-ce80-4233-a290-d138b18e52c2',
    '02f3511a-579e-410a-97c7-e3ff5f8eaf5b',
    'eyJ0aW1lIjoxNjI2MTAyMTg0NjE2LCJibG9ja3MiOlt7ImlkIjoieHU2RFI1LW95ciIsInR5cGUiOiJpbWFnZSIsImRhdGEiOnsiZmlsZSI6eyJ1cmwiOiJodHRwczovL2ZpcmViYXNlc3RvcmFnZS5nb29nbGVhcGlzLmNvbS92MC9iL2Jsb2ctM2ZkZTcuYXBwc3BvdC5jb20vby90aHVtYi0xMjQweDcwMC5qcGc/YWx0PW1lZGlhJnRva2VuPTRiMjdhYzcwLTdjZGQtNGU3Ni04NGNhLWY1MDM1M2E1M2I3MiJ9LCJjYXB0aW9uIjoiIiwid2l0aEJvcmRlciI6ZmFsc2UsInN0cmV0Y2hlZCI6ZmFsc2UsIndpdGhCYWNrZ3JvdW5kIjpmYWxzZX19LHsiaWQiOiJPdzBrUFQyNndhIiwidHlwZSI6InBhcmFncmFwaCIsImRhdGEiOnsidGV4dCI6IkhhbG8gS2FtdSwgc2ViZW5hcm55YSBrYW11IHNpYXBhIHNpaCBiaW5ndW5nIGFrdSB0dWggaHVlaHVlaHVlIn0sInR1bmVzIjp7InRleHRBbGlnbiI6eyJhbGlnbm1lbnQiOiJsZWZ0In19fSx7ImlkIjoid3BkVk85OG1IZSIsInR5cGUiOiJjb2RlQm94IiwiZGF0YSI6eyJjb2RlIjoiPHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cImhsanMtbWV0YVwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLW1ldGFcIj48c3BhbiBjbGFzcz1cImhsanMtc2VjdGlvblwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLW1ldGFcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1tZXRhXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cImhsanMtbWV0YVwiPiZsdDs/cGhwPC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48ZGl2Pjxmb250IGNvbG9yPVwiIzYyNzJhNFwiPjxicj48L2ZvbnQ+PGRpdj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLXNlY3Rpb25cIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj4kcGhwID0gbXlzcWxpX2Nvbm5lY3QoPC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48Zm9udCBjb2xvcj1cIiNmMWZhOGNcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1zZWN0aW9uXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+JGhvc3QsJHVzZXJuYW1lLCRwYXNzLCRkYjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9mb250PjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLXNlY3Rpb25cIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj4pIDwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cImhsanMta2V5d29yZFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1zZWN0aW9uXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cImhsanMta2V5d29yZFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLWtleXdvcmRcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1rZXl3b3JkXCI+b3I8L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjxzcGFuIGNsYXNzPVwiaGxqcy1zZWN0aW9uXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+IDwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cImhsanMta2V5d29yZFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1zZWN0aW9uXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cImhsanMta2V5d29yZFwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLWtleXdvcmRcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1rZXl3b3JkXCI+ZGllPC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48c3BhbiBjbGFzcz1cImhsanMtc2VjdGlvblwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cInBocFwiPigpOzwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvZGl2PjxkaXY+PGJyPjwvZGl2PjxkaXY+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cImhsanMtbWV0YVwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLW1ldGFcIj48c3BhbiBjbGFzcz1cImhsanMtc2VjdGlvblwiPjxzcGFuIGNsYXNzPVwicGhwXCI+PHNwYW4gY2xhc3M9XCJobGpzLW1ldGFcIj48c3BhbiBjbGFzcz1cInBocFwiPjxzcGFuIGNsYXNzPVwiaGxqcy1tZXRhXCI+PHNwYW4gY2xhc3M9XCJwaHBcIj48c3BhbiBjbGFzcz1cImhsanMtbWV0YVwiPj8mZ3Q7PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L3NwYW4+PC9zcGFuPjwvc3Bhbj48L2Rpdj48L2Rpdj4iLCJsYW5ndWFnZSI6Im5vbmUiLCJ0aGVtZSI6Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9oaWdobGlnaHRqcy9jZG4tcmVsZWFzZUA5LjE4LjEvYnVpbGQvc3R5bGVzL2RyYWN1bGEubWluLmNzcyJ9fV0sInZlcnNpb24iOiIyLjIyLjEifQ=='
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: likes
# ------------------------------------------------------------

INSERT INTO
  `likes` (`id`, `date`, `id_posts`, `id_users`)
VALUES
  (
    'b6e1b80b-afc1-44b8-9098-c02296eba7a4',
    '2021-07-12T22:08:59+07:00',
    '02f3511a-579e-410a-97c7-e3ff5f8eaf5b',
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ownerCategorys
# ------------------------------------------------------------

INSERT INTO
  `ownerCategorys` (`categoryId`, `userId`)
VALUES
  (
    '61f8e33b-b549-4105-b63b-2604138d17ad',
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4'
  );
INSERT INTO
  `ownerCategorys` (`categoryId`, `userId`)
VALUES
  (
    'c6ff3681-7f81-404d-9b4d-cf0bd590025c',
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: posts
# ------------------------------------------------------------

INSERT INTO
  `posts` (
    `id`,
    `title`,
    `description`,
    `thumbail_url`,
    `date_created`,
    `date_updated`,
    `url_perma`,
    `id_post_user`
  )
VALUES
  (
    '02f3511a-579e-410a-97c7-e3ff5f8eaf5b',
    'Kamu',
    '<div class=\"blog_image mb-5   \">\n                        <img src=\"https://firebasestorage.googleapis.com/v0/b/blog-3fde7.appspot.com/o/thumb-1240x700.jpg?alt=media&token=4b27ac70-7cdd-4e76-84ca-f50353a53b72\" alt=\"\" class=\"featured-image img-fluid\"/>\n                        <p class=\"text-center caption\"></p>\n                </div><p class=\"blog_post_text text-left\">Halo Kamu, sebenarnya kamu siapa sih bingung aku tuh huehuehue</p><div class=\'card card-code none\'>\n                <div style=\"\n                    color: #828282;\n                    font-size: 15px;\n                \">//theme langue: none</div>\n                <pre><span class=\"php\"><span class=\"hljs-meta\"><span class=\"php\"><span class=\"hljs-meta\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"hljs-meta\"><span class=\"php\"><span class=\"hljs-meta\"><span class=\"php\"><span class=\"hljs-meta\">&lt;?php</span></span></span></span></span></span></span></span></span></span></span><div><font color=\"#6272a4\"><br></font><div><span class=\"php\"><span class=\"php\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"php\"><span class=\"php\">$php = mysqli_connect(</span></span></span></span></span><font color=\"#f1fa8c\"><span class=\"php\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"php\"><span class=\"php\">$host,$username,$pass,$db</span></span></span></span></span></font><span class=\"php\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"php\"><span class=\"php\">) </span></span></span></span><span class=\"hljs-keyword\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"hljs-keyword\"><span class=\"php\"><span class=\"hljs-keyword\"><span class=\"php\"><span class=\"hljs-keyword\">or</span></span></span></span></span></span></span></span><span class=\"hljs-section\"><span class=\"php\"><span class=\"php\"><span class=\"php\"> </span></span></span></span><span class=\"hljs-keyword\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"hljs-keyword\"><span class=\"php\"><span class=\"hljs-keyword\"><span class=\"php\"><span class=\"hljs-keyword\">die</span></span></span></span></span></span></span></span><span class=\"hljs-section\"><span class=\"php\"><span class=\"php\"><span class=\"php\">();</span></span></span></span></span></span></div><div><br></div><div><span class=\"php\"><span class=\"hljs-meta\"><span class=\"php\"><span class=\"hljs-meta\"><span class=\"hljs-section\"><span class=\"php\"><span class=\"hljs-meta\"><span class=\"php\"><span class=\"hljs-meta\"><span class=\"php\"><span class=\"hljs-meta\">?&gt;</span></span></span></span></span></span></span></span></span></span></span></div></div></pre>\n            </div>',
    'https://firebasestorage.googleapis.com/v0/b/blog-3fde7.appspot.com/o/thumb-1240x700.jpg?alt=media&token=4b27ac70-7cdd-4e76-84ca-f50353a53b72',
    '2021-07-12T22:00:37+07:00',
    '2021-07-12T22:03:06+07:00',
    'kamu',
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4'
  );
INSERT INTO
  `posts` (
    `id`,
    `title`,
    `description`,
    `thumbail_url`,
    `date_created`,
    `date_updated`,
    `url_perma`,
    `id_post_user`
  )
VALUES
  (
    '588e65b0-ec5b-49bb-a935-26a063b1e978',
    'Testing',
    '<p class=\"blog_post_text text-left\">hello world</p>',
    'https://i.pinimg.com/736x/6e/07/84/6e0784191f379d0c9b641719bd45a247.jpg',
    '2021-07-12T16:44:26+07:00',
    'non',
    'testing',
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4'
  );
INSERT INTO
  `posts` (
    `id`,
    `title`,
    `description`,
    `thumbail_url`,
    `date_created`,
    `date_updated`,
    `url_perma`,
    `id_post_user`
  )
VALUES
  (
    '693465f8-705c-4379-92d7-cdcfe3f8507f',
    'Hello Again',
    '<div class=\"blog_image mb-5   \">\n                        <img src=\"https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&amp;cs=srgb&amp;fm=jpg&amp;ixid=MnwyMzY3NzZ8MHwxfHNlYXJjaHwzfHxjb2Rpbmd8ZW58MHx8fHwxNjI2MDg0Njgx&amp;ixlib=rb-1.2.1&amp;q=85\" alt=\"\" class=\"featured-image img-fluid\"/>\n                        <p class=\"text-center caption\"></p>\n                </div><p class=\"blog_post_text text-left\">Hello Tropeers</p>',
    'https://firebasestorage.googleapis.com/v0/b/blog-3fde7.appspot.com/o/thumb-1240x700.jpg?alt=media&token=fdc1d3d5-d521-402f-9439-739317f56536',
    '2021-07-12T17:11:54+07:00',
    'non',
    'hello-again',
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tags
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `username`,
    `name`,
    `email`,
    `profile_photo`,
    `bio`,
    `noTelp`,
    `verification`,
    `password`
  )
VALUES
  (
    'ad703881-1e5c-49cd-8687-e0df95d8a1b4',
    'jurdil06',
    'Andi Syahruddins',
    'manusiayangsempurna762@gmail.com',
    'https://www.insoft.co.id/wp-content/uploads/2014/05/default-user-image.png',
    'kamu adalah manusia terhebat',
    '',
    'false',
    '$2b$15$VzfNHD3wewkF5I.YVSTweuw4fBGxakHScwbKsBmRJ8I.XiUMizpcm'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
