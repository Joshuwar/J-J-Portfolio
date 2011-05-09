-- phpMyAdmin SQL Dump
-- version 3.2.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 09, 2011 at 06:24 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jj-portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `wp_commentmeta`
--

CREATE TABLE `wp_commentmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`meta_id`),
  KEY `comment_id` (`comment_id`),
  KEY `meta_key` (`meta_key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `wp_commentmeta`
--


-- --------------------------------------------------------

--
-- Table structure for table `wp_comments`
--

CREATE TABLE `wp_comments` (
  `comment_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `comment_post_ID` bigint(20) unsigned NOT NULL DEFAULT '0',
  `comment_author` tinytext NOT NULL,
  `comment_author_email` varchar(100) NOT NULL DEFAULT '',
  `comment_author_url` varchar(200) NOT NULL DEFAULT '',
  `comment_author_IP` varchar(100) NOT NULL DEFAULT '',
  `comment_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `comment_content` text NOT NULL,
  `comment_karma` int(11) NOT NULL DEFAULT '0',
  `comment_approved` varchar(20) NOT NULL DEFAULT '1',
  `comment_agent` varchar(255) NOT NULL DEFAULT '',
  `comment_type` varchar(20) NOT NULL DEFAULT '',
  `comment_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_ID`),
  KEY `comment_approved` (`comment_approved`),
  KEY `comment_post_ID` (`comment_post_ID`),
  KEY `comment_approved_date_gmt` (`comment_approved`,`comment_date_gmt`),
  KEY `comment_date_gmt` (`comment_date_gmt`),
  KEY `comment_parent` (`comment_parent`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `wp_comments`
--

INSERT INTO `wp_comments` VALUES(1, 1, 'Mr WordPress', '', 'http://wordpress.org/', '', '2011-04-22 11:09:38', '2011-04-22 11:09:38', 'Hi, this is a comment.<br />To delete a comment, just log in and view the post&#039;s comments. There you will have the option to edit or delete them.', 0, 'post-trashed', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wp_links`
--

CREATE TABLE `wp_links` (
  `link_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `link_url` varchar(255) NOT NULL DEFAULT '',
  `link_name` varchar(255) NOT NULL DEFAULT '',
  `link_image` varchar(255) NOT NULL DEFAULT '',
  `link_target` varchar(25) NOT NULL DEFAULT '',
  `link_description` varchar(255) NOT NULL DEFAULT '',
  `link_visible` varchar(20) NOT NULL DEFAULT 'Y',
  `link_owner` bigint(20) unsigned NOT NULL DEFAULT '1',
  `link_rating` int(11) NOT NULL DEFAULT '0',
  `link_updated` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `link_rel` varchar(255) NOT NULL DEFAULT '',
  `link_notes` mediumtext NOT NULL,
  `link_rss` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`link_id`),
  KEY `link_visible` (`link_visible`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `wp_links`
--

INSERT INTO `wp_links` VALUES(1, 'http://codex.wordpress.org/', 'Documentation', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', '');
INSERT INTO `wp_links` VALUES(2, 'http://wordpress.org/news/', 'WordPress Blog', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', 'http://wordpress.org/news/feed/');
INSERT INTO `wp_links` VALUES(3, 'http://wordpress.org/extend/ideas/', 'Suggest Ideas', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', '');
INSERT INTO `wp_links` VALUES(4, 'http://wordpress.org/support/', 'Support Forum', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', '');
INSERT INTO `wp_links` VALUES(5, 'http://wordpress.org/extend/plugins/', 'Plugins', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', '');
INSERT INTO `wp_links` VALUES(6, 'http://wordpress.org/extend/themes/', 'Themes', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', '');
INSERT INTO `wp_links` VALUES(7, 'http://planet.wordpress.org/', 'WordPress Planet', '', '', '', 'Y', 1, 0, '0000-00-00 00:00:00', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `wp_options`
--

CREATE TABLE `wp_options` (
  `option_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `blog_id` int(11) NOT NULL DEFAULT '0',
  `option_name` varchar(64) NOT NULL DEFAULT '',
  `option_value` longtext NOT NULL,
  `autoload` varchar(20) NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`option_id`),
  UNIQUE KEY `option_name` (`option_name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=217 ;

--
-- Dumping data for table `wp_options`
--

INSERT INTO `wp_options` VALUES(1, 0, 'siteurl', 'http://localhost:8888/j-j-portfolio', 'yes');
INSERT INTO `wp_options` VALUES(2, 0, 'blogname', 'J&amp;J', 'yes');
INSERT INTO `wp_options` VALUES(3, 0, 'blogdescription', 'Just another WordPress site', 'yes');
INSERT INTO `wp_options` VALUES(4, 0, 'users_can_register', '0', 'yes');
INSERT INTO `wp_options` VALUES(5, 0, 'admin_email', 'josh.u.war@gmail.com', 'yes');
INSERT INTO `wp_options` VALUES(6, 0, 'start_of_week', '1', 'yes');
INSERT INTO `wp_options` VALUES(7, 0, 'use_balanceTags', '0', 'yes');
INSERT INTO `wp_options` VALUES(8, 0, 'use_smilies', '1', 'yes');
INSERT INTO `wp_options` VALUES(9, 0, 'require_name_email', '1', 'yes');
INSERT INTO `wp_options` VALUES(10, 0, 'comments_notify', '1', 'yes');
INSERT INTO `wp_options` VALUES(11, 0, 'posts_per_rss', '10', 'yes');
INSERT INTO `wp_options` VALUES(12, 0, 'rss_use_excerpt', '0', 'yes');
INSERT INTO `wp_options` VALUES(13, 0, 'mailserver_url', 'mail.example.com', 'yes');
INSERT INTO `wp_options` VALUES(14, 0, 'mailserver_login', 'login@example.com', 'yes');
INSERT INTO `wp_options` VALUES(15, 0, 'mailserver_pass', 'password', 'yes');
INSERT INTO `wp_options` VALUES(16, 0, 'mailserver_port', '110', 'yes');
INSERT INTO `wp_options` VALUES(17, 0, 'default_category', '1', 'yes');
INSERT INTO `wp_options` VALUES(18, 0, 'default_comment_status', 'open', 'yes');
INSERT INTO `wp_options` VALUES(19, 0, 'default_ping_status', 'open', 'yes');
INSERT INTO `wp_options` VALUES(20, 0, 'default_pingback_flag', '1', 'yes');
INSERT INTO `wp_options` VALUES(21, 0, 'default_post_edit_rows', '20', 'yes');
INSERT INTO `wp_options` VALUES(22, 0, 'posts_per_page', '10', 'yes');
INSERT INTO `wp_options` VALUES(23, 0, 'date_format', 'F j, Y', 'yes');
INSERT INTO `wp_options` VALUES(24, 0, 'time_format', 'g:i a', 'yes');
INSERT INTO `wp_options` VALUES(25, 0, 'links_updated_date_format', 'F j, Y g:i a', 'yes');
INSERT INTO `wp_options` VALUES(26, 0, 'links_recently_updated_prepend', '<em>', 'yes');
INSERT INTO `wp_options` VALUES(27, 0, 'links_recently_updated_append', '</em>', 'yes');
INSERT INTO `wp_options` VALUES(28, 0, 'links_recently_updated_time', '120', 'yes');
INSERT INTO `wp_options` VALUES(29, 0, 'comment_moderation', '0', 'yes');
INSERT INTO `wp_options` VALUES(30, 0, 'moderation_notify', '1', 'yes');
INSERT INTO `wp_options` VALUES(31, 0, 'permalink_structure', '', 'yes');
INSERT INTO `wp_options` VALUES(32, 0, 'gzipcompression', '0', 'yes');
INSERT INTO `wp_options` VALUES(33, 0, 'hack_file', '0', 'yes');
INSERT INTO `wp_options` VALUES(34, 0, 'blog_charset', 'UTF-8', 'yes');
INSERT INTO `wp_options` VALUES(35, 0, 'moderation_keys', '', 'no');
INSERT INTO `wp_options` VALUES(36, 0, 'active_plugins', 'a:0:{}', 'yes');
INSERT INTO `wp_options` VALUES(37, 0, 'home', 'http://localhost:8888/j-j-portfolio', 'yes');
INSERT INTO `wp_options` VALUES(38, 0, 'category_base', '', 'yes');
INSERT INTO `wp_options` VALUES(39, 0, 'ping_sites', 'http://rpc.pingomatic.com/', 'yes');
INSERT INTO `wp_options` VALUES(40, 0, 'advanced_edit', '0', 'yes');
INSERT INTO `wp_options` VALUES(41, 0, 'comment_max_links', '2', 'yes');
INSERT INTO `wp_options` VALUES(42, 0, 'gmt_offset', '0', 'yes');
INSERT INTO `wp_options` VALUES(43, 0, 'default_email_category', '1', 'yes');
INSERT INTO `wp_options` VALUES(44, 0, 'recently_edited', '', 'no');
INSERT INTO `wp_options` VALUES(45, 0, 'template', 'scaffolding', 'yes');
INSERT INTO `wp_options` VALUES(46, 0, 'stylesheet', 'jj-theme', 'yes');
INSERT INTO `wp_options` VALUES(47, 0, 'comment_whitelist', '1', 'yes');
INSERT INTO `wp_options` VALUES(48, 0, 'blacklist_keys', '', 'no');
INSERT INTO `wp_options` VALUES(49, 0, 'comment_registration', '0', 'yes');
INSERT INTO `wp_options` VALUES(50, 0, 'rss_language', 'en', 'yes');
INSERT INTO `wp_options` VALUES(51, 0, 'html_type', 'text/html', 'yes');
INSERT INTO `wp_options` VALUES(52, 0, 'use_trackback', '0', 'yes');
INSERT INTO `wp_options` VALUES(53, 0, 'default_role', 'subscriber', 'yes');
INSERT INTO `wp_options` VALUES(54, 0, 'db_version', '17516', 'yes');
INSERT INTO `wp_options` VALUES(55, 0, 'uploads_use_yearmonth_folders', '1', 'yes');
INSERT INTO `wp_options` VALUES(56, 0, 'upload_path', '', 'yes');
INSERT INTO `wp_options` VALUES(57, 0, 'blog_public', '1', 'yes');
INSERT INTO `wp_options` VALUES(58, 0, 'default_link_category', '2', 'yes');
INSERT INTO `wp_options` VALUES(59, 0, 'show_on_front', 'posts', 'yes');
INSERT INTO `wp_options` VALUES(60, 0, 'tag_base', '', 'yes');
INSERT INTO `wp_options` VALUES(61, 0, 'show_avatars', '1', 'yes');
INSERT INTO `wp_options` VALUES(62, 0, 'avatar_rating', 'G', 'yes');
INSERT INTO `wp_options` VALUES(63, 0, 'upload_url_path', '', 'yes');
INSERT INTO `wp_options` VALUES(64, 0, 'thumbnail_size_w', '150', 'yes');
INSERT INTO `wp_options` VALUES(65, 0, 'thumbnail_size_h', '150', 'yes');
INSERT INTO `wp_options` VALUES(66, 0, 'thumbnail_crop', '1', 'yes');
INSERT INTO `wp_options` VALUES(67, 0, 'medium_size_w', '300', 'yes');
INSERT INTO `wp_options` VALUES(68, 0, 'medium_size_h', '300', 'yes');
INSERT INTO `wp_options` VALUES(69, 0, 'avatar_default', 'mystery', 'yes');
INSERT INTO `wp_options` VALUES(70, 0, 'enable_app', '0', 'yes');
INSERT INTO `wp_options` VALUES(71, 0, 'enable_xmlrpc', '0', 'yes');
INSERT INTO `wp_options` VALUES(72, 0, 'large_size_w', '1024', 'yes');
INSERT INTO `wp_options` VALUES(73, 0, 'large_size_h', '1024', 'yes');
INSERT INTO `wp_options` VALUES(74, 0, 'image_default_link_type', 'file', 'yes');
INSERT INTO `wp_options` VALUES(75, 0, 'image_default_size', '', 'yes');
INSERT INTO `wp_options` VALUES(76, 0, 'image_default_align', '', 'yes');
INSERT INTO `wp_options` VALUES(77, 0, 'close_comments_for_old_posts', '0', 'yes');
INSERT INTO `wp_options` VALUES(78, 0, 'close_comments_days_old', '14', 'yes');
INSERT INTO `wp_options` VALUES(79, 0, 'thread_comments', '1', 'yes');
INSERT INTO `wp_options` VALUES(80, 0, 'thread_comments_depth', '5', 'yes');
INSERT INTO `wp_options` VALUES(81, 0, 'page_comments', '0', 'yes');
INSERT INTO `wp_options` VALUES(82, 0, 'comments_per_page', '50', 'yes');
INSERT INTO `wp_options` VALUES(83, 0, 'default_comments_page', 'newest', 'yes');
INSERT INTO `wp_options` VALUES(84, 0, 'comment_order', 'asc', 'yes');
INSERT INTO `wp_options` VALUES(85, 0, 'sticky_posts', 'a:0:{}', 'yes');
INSERT INTO `wp_options` VALUES(86, 0, 'widget_categories', 'a:2:{i:2;a:4:{s:5:"title";s:0:"";s:5:"count";i:0;s:12:"hierarchical";i:0;s:8:"dropdown";i:0;}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(87, 0, 'widget_text', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(88, 0, 'widget_rss', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(89, 0, 'timezone_string', '', 'yes');
INSERT INTO `wp_options` VALUES(90, 0, 'embed_autourls', '1', 'yes');
INSERT INTO `wp_options` VALUES(91, 0, 'embed_size_w', '', 'yes');
INSERT INTO `wp_options` VALUES(92, 0, 'embed_size_h', '600', 'yes');
INSERT INTO `wp_options` VALUES(93, 0, 'page_for_posts', '0', 'yes');
INSERT INTO `wp_options` VALUES(94, 0, 'page_on_front', '0', 'yes');
INSERT INTO `wp_options` VALUES(95, 0, 'default_post_format', '0', 'yes');
INSERT INTO `wp_options` VALUES(96, 0, 'wp_user_roles', 'a:5:{s:13:"administrator";a:2:{s:4:"name";s:13:"Administrator";s:12:"capabilities";a:62:{s:13:"switch_themes";b:1;s:11:"edit_themes";b:1;s:16:"activate_plugins";b:1;s:12:"edit_plugins";b:1;s:10:"edit_users";b:1;s:10:"edit_files";b:1;s:14:"manage_options";b:1;s:17:"moderate_comments";b:1;s:17:"manage_categories";b:1;s:12:"manage_links";b:1;s:12:"upload_files";b:1;s:6:"import";b:1;s:15:"unfiltered_html";b:1;s:10:"edit_posts";b:1;s:17:"edit_others_posts";b:1;s:20:"edit_published_posts";b:1;s:13:"publish_posts";b:1;s:10:"edit_pages";b:1;s:4:"read";b:1;s:8:"level_10";b:1;s:7:"level_9";b:1;s:7:"level_8";b:1;s:7:"level_7";b:1;s:7:"level_6";b:1;s:7:"level_5";b:1;s:7:"level_4";b:1;s:7:"level_3";b:1;s:7:"level_2";b:1;s:7:"level_1";b:1;s:7:"level_0";b:1;s:17:"edit_others_pages";b:1;s:20:"edit_published_pages";b:1;s:13:"publish_pages";b:1;s:12:"delete_pages";b:1;s:19:"delete_others_pages";b:1;s:22:"delete_published_pages";b:1;s:12:"delete_posts";b:1;s:19:"delete_others_posts";b:1;s:22:"delete_published_posts";b:1;s:20:"delete_private_posts";b:1;s:18:"edit_private_posts";b:1;s:18:"read_private_posts";b:1;s:20:"delete_private_pages";b:1;s:18:"edit_private_pages";b:1;s:18:"read_private_pages";b:1;s:12:"delete_users";b:1;s:12:"create_users";b:1;s:17:"unfiltered_upload";b:1;s:14:"edit_dashboard";b:1;s:14:"update_plugins";b:1;s:14:"delete_plugins";b:1;s:15:"install_plugins";b:1;s:13:"update_themes";b:1;s:14:"install_themes";b:1;s:11:"update_core";b:1;s:10:"list_users";b:1;s:12:"remove_users";b:1;s:9:"add_users";b:1;s:13:"promote_users";b:1;s:18:"edit_theme_options";b:1;s:13:"delete_themes";b:1;s:6:"export";b:1;}}s:6:"editor";a:2:{s:4:"name";s:6:"Editor";s:12:"capabilities";a:34:{s:17:"moderate_comments";b:1;s:17:"manage_categories";b:1;s:12:"manage_links";b:1;s:12:"upload_files";b:1;s:15:"unfiltered_html";b:1;s:10:"edit_posts";b:1;s:17:"edit_others_posts";b:1;s:20:"edit_published_posts";b:1;s:13:"publish_posts";b:1;s:10:"edit_pages";b:1;s:4:"read";b:1;s:7:"level_7";b:1;s:7:"level_6";b:1;s:7:"level_5";b:1;s:7:"level_4";b:1;s:7:"level_3";b:1;s:7:"level_2";b:1;s:7:"level_1";b:1;s:7:"level_0";b:1;s:17:"edit_others_pages";b:1;s:20:"edit_published_pages";b:1;s:13:"publish_pages";b:1;s:12:"delete_pages";b:1;s:19:"delete_others_pages";b:1;s:22:"delete_published_pages";b:1;s:12:"delete_posts";b:1;s:19:"delete_others_posts";b:1;s:22:"delete_published_posts";b:1;s:20:"delete_private_posts";b:1;s:18:"edit_private_posts";b:1;s:18:"read_private_posts";b:1;s:20:"delete_private_pages";b:1;s:18:"edit_private_pages";b:1;s:18:"read_private_pages";b:1;}}s:6:"author";a:2:{s:4:"name";s:6:"Author";s:12:"capabilities";a:10:{s:12:"upload_files";b:1;s:10:"edit_posts";b:1;s:20:"edit_published_posts";b:1;s:13:"publish_posts";b:1;s:4:"read";b:1;s:7:"level_2";b:1;s:7:"level_1";b:1;s:7:"level_0";b:1;s:12:"delete_posts";b:1;s:22:"delete_published_posts";b:1;}}s:11:"contributor";a:2:{s:4:"name";s:11:"Contributor";s:12:"capabilities";a:5:{s:10:"edit_posts";b:1;s:4:"read";b:1;s:7:"level_1";b:1;s:7:"level_0";b:1;s:12:"delete_posts";b:1;}}s:10:"subscriber";a:2:{s:4:"name";s:10:"Subscriber";s:12:"capabilities";a:2:{s:4:"read";b:1;s:7:"level_0";b:1;}}}', 'yes');
INSERT INTO `wp_options` VALUES(97, 0, 'widget_search', 'a:2:{i:2;a:1:{s:5:"title";s:0:"";}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(98, 0, 'widget_recent-posts', 'a:2:{i:2;a:2:{s:5:"title";s:0:"";s:6:"number";i:5;}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(99, 0, 'widget_recent-comments', 'a:2:{i:2;a:2:{s:5:"title";s:0:"";s:6:"number";i:5;}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(100, 0, 'widget_archives', 'a:2:{i:2;a:3:{s:5:"title";s:0:"";s:5:"count";i:0;s:8:"dropdown";i:0;}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(101, 0, 'widget_meta', 'a:2:{i:2;a:1:{s:5:"title";s:0:"";}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(102, 0, 'sidebars_widgets', 'a:2:{s:19:"wp_inactive_widgets";a:13:{i:0;s:7:"pages-2";i:1;s:10:"calendar-2";i:2;s:7:"links-2";i:3;s:6:"text-2";i:4;s:5:"rss-2";i:5;s:11:"tag_cloud-2";i:6;s:10:"nav_menu-2";i:7;s:8:"search-2";i:8;s:14:"recent-posts-2";i:9;s:17:"recent-comments-2";i:10;s:10:"archives-2";i:11;s:12:"categories-2";i:12;s:6:"meta-2";}s:13:"array_version";i:3;}', 'yes');
INSERT INTO `wp_options` VALUES(103, 0, 'cron', 'a:3:{i:1304982581;a:3:{s:16:"wp_version_check";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:10:"twicedaily";s:4:"args";a:0:{}s:8:"interval";i:43200;}}s:17:"wp_update_plugins";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:10:"twicedaily";s:4:"args";a:0:{}s:8:"interval";i:43200;}}s:16:"wp_update_themes";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:10:"twicedaily";s:4:"args";a:0:{}s:8:"interval";i:43200;}}}i:1305025786;a:1:{s:19:"wp_scheduled_delete";a:1:{s:32:"40cd750bba9870f18aada2478b24840a";a:3:{s:8:"schedule";s:5:"daily";s:4:"args";a:0:{}s:8:"interval";i:86400;}}}s:7:"version";i:2;}', 'yes');
INSERT INTO `wp_options` VALUES(104, 0, '_transient_doing_cron', '1304956573', 'yes');
INSERT INTO `wp_options` VALUES(215, 0, '_site_transient_timeout_theme_roots', '1304963775', 'yes');
INSERT INTO `wp_options` VALUES(105, 0, '_site_transient_update_core', 'O:8:"stdClass":3:{s:7:"updates";a:1:{i:0;O:8:"stdClass":7:{s:8:"response";s:7:"upgrade";s:3:"url";s:30:"http://wordpress.org/download/";s:7:"package";s:40:"http://wordpress.org/wordpress-3.1.2.zip";s:7:"current";s:5:"3.1.2";s:6:"locale";s:5:"en_US";s:11:"php_version";s:3:"4.3";s:13:"mysql_version";s:5:"4.1.2";}}s:12:"last_checked";i:1304956574;s:15:"version_checked";s:5:"3.1.1";}', 'yes');
INSERT INTO `wp_options` VALUES(106, 0, '_site_transient_update_plugins', 'O:8:"stdClass":3:{s:12:"last_checked";i:1304956575;s:7:"checked";a:2:{s:19:"akismet/akismet.php";s:5:"2.5.3";s:9:"hello.php";s:3:"1.6";}s:8:"response";a:0:{}}', 'yes');
INSERT INTO `wp_options` VALUES(216, 0, '_site_transient_theme_roots', 'a:3:{s:11:"Scaffolding";s:7:"/themes";s:8:"jj-theme";s:7:"/themes";s:9:"twentyten";s:7:"/themes";}', 'yes');
INSERT INTO `wp_options` VALUES(109, 0, '_site_transient_update_themes', 'O:8:"stdClass":1:{s:12:"last_checked";i:1304956576;}', 'yes');
INSERT INTO `wp_options` VALUES(110, 0, 'widget_pages', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(111, 0, 'widget_calendar', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(112, 0, 'widget_links', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(113, 0, 'widget_tag_cloud', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(114, 0, 'widget_nav_menu', 'a:2:{i:2;a:0:{}s:12:"_multiwidget";i:1;}', 'yes');
INSERT INTO `wp_options` VALUES(115, 0, 'dashboard_widget_options', 'a:4:{s:25:"dashboard_recent_comments";a:1:{s:5:"items";i:5;}s:24:"dashboard_incoming_links";a:5:{s:4:"home";s:35:"http://localhost:8888/j-j-portfolio";s:4:"link";s:111:"http://blogsearch.google.com/blogsearch?scoring=d&partner=wordpress&q=link:http://localhost:8888/j-j-portfolio/";s:3:"url";s:144:"http://blogsearch.google.com/blogsearch_feeds?scoring=d&ie=utf-8&num=10&output=rss&partner=wordpress&q=link:http://localhost:8888/j-j-portfolio/";s:5:"items";i:10;s:9:"show_date";b:0;}s:17:"dashboard_primary";a:7:{s:4:"link";s:26:"http://wordpress.org/news/";s:3:"url";s:31:"http://wordpress.org/news/feed/";s:5:"title";s:14:"WordPress Blog";s:5:"items";i:2;s:12:"show_summary";i:1;s:11:"show_author";i:0;s:9:"show_date";i:1;}s:19:"dashboard_secondary";a:7:{s:4:"link";s:28:"http://planet.wordpress.org/";s:3:"url";s:33:"http://planet.wordpress.org/feed/";s:5:"title";s:20:"Other WordPress News";s:5:"items";i:5;s:12:"show_summary";i:0;s:11:"show_author";i:0;s:9:"show_date";i:0;}}', 'yes');
INSERT INTO `wp_options` VALUES(146, 0, 'current_theme', 'J&amp;J Theme', 'yes');
INSERT INTO `wp_options` VALUES(117, 0, 'can_compress_scripts', '1', 'yes');
INSERT INTO `wp_options` VALUES(206, 0, '_transient_random_seed', 'e2da3f1c3bc957f397658406c9e36287', 'yes');
INSERT INTO `wp_options` VALUES(211, 0, '_transient_timeout_plugin_slugs', '1304777648', 'no');
INSERT INTO `wp_options` VALUES(212, 0, '_transient_plugin_slugs', 'a:2:{i:0;s:19:"akismet/akismet.php";i:1;s:9:"hello.php";}', 'no');
INSERT INTO `wp_options` VALUES(144, 0, '_site_transient_timeout_wporg_theme_feature_list', '1303482661', 'yes');
INSERT INTO `wp_options` VALUES(145, 0, '_site_transient_wporg_theme_feature_list', 'a:5:{s:6:"Colors";a:14:{i:0;s:5:"black";i:1;s:4:"blue";i:2;s:5:"brown";i:3;s:5:"green";i:4;s:6:"orange";i:5;s:4:"pink";i:6;s:6:"purple";i:7;s:3:"red";i:8;s:6:"silver";i:9;s:3:"tan";i:10;s:5:"white";i:11;s:6:"yellow";i:12;s:4:"dark";i:13;s:5:"light";}s:7:"Columns";a:6:{i:0;s:10:"one-column";i:1;s:11:"two-columns";i:2;s:13:"three-columns";i:3;s:12:"four-columns";i:4;s:12:"left-sidebar";i:5;s:13:"right-sidebar";}s:5:"Width";a:2:{i:0;s:11:"fixed-width";i:1;s:14:"flexible-width";}s:8:"Features";a:13:{i:0;s:13:"custom-colors";i:1;s:13:"custom-header";i:2;s:17:"custom-background";i:3;s:11:"custom-menu";i:4;s:12:"editor-style";i:5;s:13:"theme-options";i:6;s:17:"threaded-comments";i:7;s:11:"sticky-post";i:8;s:12:"microformats";i:9;s:20:"rtl-language-support";i:10;s:17:"translation-ready";i:11;s:20:"front-page-post-form";i:12;s:10:"buddypress";}s:7:"Subject";a:3:{i:0;s:7:"holiday";i:1;s:13:"photoblogging";i:2;s:8:"seasonal";}}', 'yes');
INSERT INTO `wp_options` VALUES(147, 0, 'theme_mods_jj-theme', 'a:2:{i:0;b:0;s:18:"nav_menu_locations";a:3:{s:8:"top_menu";i:3;s:9:"main_menu";i:0;s:11:"footer_menu";i:0;}}', 'yes');
INSERT INTO `wp_options` VALUES(150, 0, 'recently_activated', 'a:0:{}', 'yes');
INSERT INTO `wp_options` VALUES(151, 0, 'nav_menu_options', 'a:2:{i:0;b:0;s:8:"auto_add";a:0:{}}', 'yes');
INSERT INTO `wp_options` VALUES(177, 0, 'category_children', 'a:0:{}', 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `wp_postmeta`
--

CREATE TABLE `wp_postmeta` (
  `meta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`meta_id`),
  KEY `post_id` (`post_id`),
  KEY `meta_key` (`meta_key`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=157 ;

--
-- Dumping data for table `wp_postmeta`
--

INSERT INTO `wp_postmeta` VALUES(1, 2, '_wp_page_template', 'default');
INSERT INTO `wp_postmeta` VALUES(38, 14, '_menu_item_target', '');
INSERT INTO `wp_postmeta` VALUES(37, 14, '_menu_item_object', 'category');
INSERT INTO `wp_postmeta` VALUES(36, 14, '_menu_item_object_id', '6');
INSERT INTO `wp_postmeta` VALUES(35, 14, '_menu_item_menu_item_parent', '0');
INSERT INTO `wp_postmeta` VALUES(34, 14, '_menu_item_type', 'taxonomy');
INSERT INTO `wp_postmeta` VALUES(11, 6, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(12, 6, '_edit_lock', '1303484124:1');
INSERT INTO `wp_postmeta` VALUES(15, 1, '_edit_lock', '1303572797:1');
INSERT INTO `wp_postmeta` VALUES(16, 1, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(25, 13, '_menu_item_type', 'taxonomy');
INSERT INTO `wp_postmeta` VALUES(26, 13, '_menu_item_menu_item_parent', '0');
INSERT INTO `wp_postmeta` VALUES(27, 13, '_menu_item_object_id', '4');
INSERT INTO `wp_postmeta` VALUES(28, 13, '_menu_item_object', 'category');
INSERT INTO `wp_postmeta` VALUES(29, 13, '_menu_item_target', '');
INSERT INTO `wp_postmeta` VALUES(30, 13, '_menu_item_classes', 'a:1:{i:0;s:0:"";}');
INSERT INTO `wp_postmeta` VALUES(31, 13, '_menu_item_xfn', '');
INSERT INTO `wp_postmeta` VALUES(32, 13, '_menu_item_url', '');
INSERT INTO `wp_postmeta` VALUES(39, 14, '_menu_item_classes', 'a:1:{i:0;s:0:"";}');
INSERT INTO `wp_postmeta` VALUES(40, 14, '_menu_item_xfn', '');
INSERT INTO `wp_postmeta` VALUES(41, 14, '_menu_item_url', '');
INSERT INTO `wp_postmeta` VALUES(52, 16, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(43, 15, '_menu_item_type', 'taxonomy');
INSERT INTO `wp_postmeta` VALUES(44, 15, '_menu_item_menu_item_parent', '0');
INSERT INTO `wp_postmeta` VALUES(45, 15, '_menu_item_object_id', '5');
INSERT INTO `wp_postmeta` VALUES(46, 15, '_menu_item_object', 'category');
INSERT INTO `wp_postmeta` VALUES(47, 15, '_menu_item_target', '');
INSERT INTO `wp_postmeta` VALUES(48, 15, '_menu_item_classes', 'a:1:{i:0;s:0:"";}');
INSERT INTO `wp_postmeta` VALUES(49, 15, '_menu_item_xfn', '');
INSERT INTO `wp_postmeta` VALUES(50, 15, '_menu_item_url', '');
INSERT INTO `wp_postmeta` VALUES(53, 16, '_edit_lock', '1303727588:1');
INSERT INTO `wp_postmeta` VALUES(54, 28, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(55, 28, '_edit_lock', '1304695909:1');
INSERT INTO `wp_postmeta` VALUES(56, 28, '_url', 'whatonearthbooks.com');
INSERT INTO `wp_postmeta` VALUES(57, 28, '_collaborators', 'Illustrator Duder');
INSERT INTO `wp_postmeta` VALUES(58, 28, '_testimonial', 'It''s been a true delight to work with J&J. They are professional, funny, skilful and creative - a winning combination.');
INSERT INTO `wp_postmeta` VALUES(59, 28, '_testimonial_name', 'Chris Lloyd');
INSERT INTO `wp_postmeta` VALUES(60, 28, '_hireus', 'We help Chris sell more books. Hire us to sell yours!');
INSERT INTO `wp_postmeta` VALUES(61, 6, '_wp_trash_meta_status', 'publish');
INSERT INTO `wp_postmeta` VALUES(62, 6, '_wp_trash_meta_time', '1303578451');
INSERT INTO `wp_postmeta` VALUES(63, 1, '_wp_trash_meta_status', 'publish');
INSERT INTO `wp_postmeta` VALUES(64, 1, '_wp_trash_meta_time', '1303578458');
INSERT INTO `wp_postmeta` VALUES(65, 1, '_wp_trash_meta_comments_status', 'a:1:{i:1;s:1:"1";}');
INSERT INTO `wp_postmeta` VALUES(66, 31, '_wp_attached_file', '2011/04/woe.gif');
INSERT INTO `wp_postmeta` VALUES(67, 31, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:3:"598";s:6:"height";s:4:"1075";s:14:"hwstring_small";s:22:"height=''96'' width=''53''";s:4:"file";s:15:"2011/04/woe.gif";s:5:"sizes";a:3:{s:9:"thumbnail";a:3:{s:4:"file";s:15:"woe-150x150.gif";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:15:"woe-166x300.gif";s:5:"width";s:3:"166";s:6:"height";s:3:"300";}s:5:"large";a:3:{s:4:"file";s:16:"woe-569x1024.gif";s:5:"width";s:3:"569";s:6:"height";s:4:"1024";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(68, 28, '_thumbnail_id', '31');
INSERT INTO `wp_postmeta` VALUES(69, 31, '_wp_attachment_image_alt', 'Home Page');
INSERT INTO `wp_postmeta` VALUES(70, 32, '_wp_attached_file', '2011/04/woe_2.png');
INSERT INTO `wp_postmeta` VALUES(71, 32, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:4:"3139";s:14:"hwstring_small";s:22:"height=''96'' width=''38''";s:4:"file";s:17:"2011/04/woe_2.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:17:"woe_2-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:17:"woe_2-120x300.png";s:5:"width";s:3:"120";s:6:"height";s:3:"300";}s:5:"large";a:3:{s:4:"file";s:18:"woe_2-411x1024.png";s:5:"width";s:3:"411";s:6:"height";s:4:"1024";}s:15:"portfolio-image";a:3:{s:4:"file";s:18:"woe_2-598x1488.png";s:5:"width";s:3:"598";s:6:"height";s:4:"1488";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(72, 33, '_wp_attached_file', '2011/04/woe_3.png');
INSERT INTO `wp_postmeta` VALUES(73, 33, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:4:"2719";s:14:"hwstring_small";s:22:"height=''96'' width=''44''";s:4:"file";s:17:"2011/04/woe_3.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:17:"woe_3-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:17:"woe_3-139x300.png";s:5:"width";s:3:"139";s:6:"height";s:3:"300";}s:5:"large";a:3:{s:4:"file";s:18:"woe_3-474x1024.png";s:5:"width";s:3:"474";s:6:"height";s:4:"1024";}s:15:"portfolio-image";a:3:{s:4:"file";s:18:"woe_3-598x1289.png";s:5:"width";s:3:"598";s:6:"height";s:4:"1289";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(74, 34, '_wp_attached_file', '2011/04/woe_southbank.jpg');
INSERT INTO `wp_postmeta` VALUES(75, 34, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1200";s:6:"height";s:3:"730";s:14:"hwstring_small";s:23:"height=''77'' width=''128''";s:4:"file";s:25:"2011/04/woe_southbank.jpg";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:25:"woe_southbank-150x150.jpg";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:25:"woe_southbank-300x182.jpg";s:5:"width";s:3:"300";s:6:"height";s:3:"182";}s:5:"large";a:3:{s:4:"file";s:26:"woe_southbank-1024x622.jpg";s:5:"width";s:4:"1024";s:6:"height";s:3:"622";}s:15:"portfolio-image";a:3:{s:4:"file";s:25:"woe_southbank-598x363.jpg";s:5:"width";s:3:"598";s:6:"height";s:3:"363";}}s:10:"image_meta";a:10:{s:8:"aperture";s:3:"6.3";s:6:"credit";s:10:"Geoff Pugh";s:6:"camera";s:9:"NIKON D3S";s:7:"caption";s:83:"Sco0026632\nChristopher Lloyd''s WallBook by the Thames near Tower Bridge.\n21/10/2010";s:17:"created_timestamp";s:10:"1287649536";s:9:"copyright";s:26:"Telegraph Media Group Ltd.";s:12:"focal_length";s:2:"14";s:3:"iso";s:3:"400";s:13:"shutter_speed";s:7:"0.00125";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(76, 36, '_wp_attached_file', '2011/04/jeroboams_1.png');
INSERT INTO `wp_postmeta` VALUES(77, 36, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:4:"2679";s:14:"hwstring_small";s:22:"height=''96'' width=''45''";s:4:"file";s:23:"2011/04/jeroboams_1.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:23:"jeroboams_1-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:23:"jeroboams_1-141x300.png";s:5:"width";s:3:"141";s:6:"height";s:3:"300";}s:5:"large";a:3:{s:4:"file";s:24:"jeroboams_1-481x1024.png";s:5:"width";s:3:"481";s:6:"height";s:4:"1024";}s:15:"portfolio-image";a:3:{s:4:"file";s:24:"jeroboams_1-598x1270.png";s:5:"width";s:3:"598";s:6:"height";s:4:"1270";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(78, 37, '_wp_attached_file', '2011/04/jeroboams_2.png');
INSERT INTO `wp_postmeta` VALUES(79, 37, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:4:"1084";s:14:"hwstring_small";s:23:"height=''96'' width=''111''";s:4:"file";s:23:"2011/04/jeroboams_2.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:23:"jeroboams_2-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:23:"jeroboams_2-300x257.png";s:5:"width";s:3:"300";s:6:"height";s:3:"257";}s:5:"large";a:3:{s:4:"file";s:24:"jeroboams_2-1024x880.png";s:5:"width";s:4:"1024";s:6:"height";s:3:"880";}s:15:"portfolio-image";a:3:{s:4:"file";s:23:"jeroboams_2-598x514.png";s:5:"width";s:3:"598";s:6:"height";s:3:"514";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(80, 35, '_thumbnail_id', '36');
INSERT INTO `wp_postmeta` VALUES(81, 35, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(82, 35, '_edit_lock', '1304695884:1');
INSERT INTO `wp_postmeta` VALUES(83, 35, '_url', 'enprimeur.jeroboams.co.uk');
INSERT INTO `wp_postmeta` VALUES(84, 35, '_collaborators', 'Daniel Morris');
INSERT INTO `wp_postmeta` VALUES(85, 35, '_testimonial', 'J&J are simply delightful!');
INSERT INTO `wp_postmeta` VALUES(86, 35, '_testimonial_name', 'Charlotte Hambly');
INSERT INTO `wp_postmeta` VALUES(87, 35, '_hireus', 'We sell wine for Jeroboams. Hire us to sell yours!');
INSERT INTO `wp_postmeta` VALUES(88, 41, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(89, 41, '_edit_lock', '1303814849:1');
INSERT INTO `wp_postmeta` VALUES(90, 41, '_wp_trash_meta_status', 'draft');
INSERT INTO `wp_postmeta` VALUES(91, 41, '_wp_trash_meta_time', '1303814855');
INSERT INTO `wp_postmeta` VALUES(92, 42, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(93, 42, '_edit_lock', '1303821183:1');
INSERT INTO `wp_postmeta` VALUES(105, 50, '_wp_attached_file', '2011/04/avox.png');
INSERT INTO `wp_postmeta` VALUES(106, 50, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:3:"855";s:14:"hwstring_small";s:23:"height=''86'' width=''128''";s:4:"file";s:16:"2011/04/avox.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:16:"avox-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:16:"avox-300x203.png";s:5:"width";s:3:"300";s:6:"height";s:3:"203";}s:5:"large";a:3:{s:4:"file";s:17:"avox-1024x694.png";s:5:"width";s:4:"1024";s:6:"height";s:3:"694";}s:15:"portfolio-image";a:3:{s:4:"file";s:16:"avox-598x405.png";s:5:"width";s:3:"598";s:6:"height";s:3:"405";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(96, 42, '_thumbnail_id', '47');
INSERT INTO `wp_postmeta` VALUES(101, 47, '_wp_attached_file', '2011/04/bg.jpg');
INSERT INTO `wp_postmeta` VALUES(102, 47, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1200";s:6:"height";s:3:"844";s:14:"hwstring_small";s:23:"height=''90'' width=''128''";s:4:"file";s:14:"2011/04/bg.jpg";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:14:"bg-150x150.jpg";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:14:"bg-300x211.jpg";s:5:"width";s:3:"300";s:6:"height";s:3:"211";}s:5:"large";a:3:{s:4:"file";s:15:"bg-1024x720.jpg";s:5:"width";s:4:"1024";s:6:"height";s:3:"720";}s:15:"portfolio-image";a:3:{s:4:"file";s:14:"bg-598x420.jpg";s:5:"width";s:3:"598";s:6:"height";s:3:"420";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(107, 49, '_thumbnail_id', '50');
INSERT INTO `wp_postmeta` VALUES(108, 49, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(109, 49, '_edit_lock', '1303816201:1');
INSERT INTO `wp_postmeta` VALUES(110, 49, '_wp_trash_meta_status', 'draft');
INSERT INTO `wp_postmeta` VALUES(111, 49, '_wp_trash_meta_time', '1303816204');
INSERT INTO `wp_postmeta` VALUES(112, 52, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(113, 52, '_edit_lock', '1303816235:1');
INSERT INTO `wp_postmeta` VALUES(114, 53, '_wp_attached_file', '2011/04/avox1.png');
INSERT INTO `wp_postmeta` VALUES(115, 53, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:3:"855";s:14:"hwstring_small";s:23:"height=''86'' width=''128''";s:4:"file";s:17:"2011/04/avox1.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:17:"avox1-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:17:"avox1-300x203.png";s:5:"width";s:3:"300";s:6:"height";s:3:"203";}s:5:"large";a:3:{s:4:"file";s:18:"avox1-1024x694.png";s:5:"width";s:4:"1024";s:6:"height";s:3:"694";}s:15:"portfolio-image";a:3:{s:4:"file";s:17:"avox1-598x405.png";s:5:"width";s:3:"598";s:6:"height";s:3:"405";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(116, 52, '_thumbnail_id', '53');
INSERT INTO `wp_postmeta` VALUES(122, 55, '_wp_attached_file', '2011/04/ambit_1.png');
INSERT INTO `wp_postmeta` VALUES(123, 55, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:4:"1261";s:6:"height";s:4:"1300";s:14:"hwstring_small";s:22:"height=''96'' width=''93''";s:4:"file";s:19:"2011/04/ambit_1.png";s:5:"sizes";a:4:{s:9:"thumbnail";a:3:{s:4:"file";s:19:"ambit_1-150x150.png";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:19:"ambit_1-291x300.png";s:5:"width";s:3:"291";s:6:"height";s:3:"300";}s:5:"large";a:3:{s:4:"file";s:20:"ambit_1-993x1024.png";s:5:"width";s:3:"993";s:6:"height";s:4:"1024";}s:15:"portfolio-image";a:3:{s:4:"file";s:19:"ambit_1-598x616.png";s:5:"width";s:3:"598";s:6:"height";s:3:"616";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(124, 54, '_thumbnail_id', '55');
INSERT INTO `wp_postmeta` VALUES(125, 54, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(126, 54, '_edit_lock', '1304691405:1');
INSERT INTO `wp_postmeta` VALUES(132, 55, '_wp_attachment_image_alt', 'BRAKKKK');
INSERT INTO `wp_postmeta` VALUES(143, 34, '_wp_attachment_image_alt', 'Giant Wallbook on the Southbank');
INSERT INTO `wp_postmeta` VALUES(144, 33, '_wp_attachment_image_alt', 'Article Page');
INSERT INTO `wp_postmeta` VALUES(145, 32, '_wp_attachment_image_alt', 'Blog Page');
INSERT INTO `wp_postmeta` VALUES(146, 57, '_edit_last', '1');
INSERT INTO `wp_postmeta` VALUES(147, 57, '_edit_lock', '1304693464:1');
INSERT INTO `wp_postmeta` VALUES(150, 59, '_wp_attached_file', '2011/05/star.gif');
INSERT INTO `wp_postmeta` VALUES(151, 59, '_wp_attachment_metadata', 'a:6:{s:5:"width";s:3:"416";s:6:"height";s:3:"305";s:14:"hwstring_small";s:23:"height=''93'' width=''128''";s:4:"file";s:16:"2011/05/star.gif";s:5:"sizes";a:2:{s:9:"thumbnail";a:3:{s:4:"file";s:16:"star-150x150.gif";s:5:"width";s:3:"150";s:6:"height";s:3:"150";}s:6:"medium";a:3:{s:4:"file";s:16:"star-300x219.gif";s:5:"width";s:3:"300";s:6:"height";s:3:"219";}}s:10:"image_meta";a:10:{s:8:"aperture";s:1:"0";s:6:"credit";s:0:"";s:6:"camera";s:0:"";s:7:"caption";s:0:"";s:17:"created_timestamp";s:1:"0";s:9:"copyright";s:0:"";s:12:"focal_length";s:1:"0";s:3:"iso";s:1:"0";s:13:"shutter_speed";s:1:"0";s:5:"title";s:0:"";}}');
INSERT INTO `wp_postmeta` VALUES(152, 57, '_thumbnail_id', '59');
INSERT INTO `wp_postmeta` VALUES(155, 37, '_wp_attachment_image_alt', 'Wine List');
INSERT INTO `wp_postmeta` VALUES(156, 36, '_wp_attachment_image_alt', 'Home Page');

-- --------------------------------------------------------

--
-- Table structure for table `wp_posts`
--

CREATE TABLE `wp_posts` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_author` bigint(20) unsigned NOT NULL DEFAULT '0',
  `post_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_date_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content` longtext NOT NULL,
  `post_title` text NOT NULL,
  `post_excerpt` text NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'publish',
  `comment_status` varchar(20) NOT NULL DEFAULT 'open',
  `ping_status` varchar(20) NOT NULL DEFAULT 'open',
  `post_password` varchar(20) NOT NULL DEFAULT '',
  `post_name` varchar(200) NOT NULL DEFAULT '',
  `to_ping` text NOT NULL,
  `pinged` text NOT NULL,
  `post_modified` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_modified_gmt` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `post_content_filtered` text NOT NULL,
  `post_parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `guid` varchar(255) NOT NULL DEFAULT '',
  `menu_order` int(11) NOT NULL DEFAULT '0',
  `post_type` varchar(20) NOT NULL DEFAULT 'post',
  `post_mime_type` varchar(100) NOT NULL DEFAULT '',
  `comment_count` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `post_name` (`post_name`),
  KEY `type_status_date` (`post_type`,`post_status`,`post_date`,`ID`),
  KEY `post_parent` (`post_parent`),
  KEY `post_author` (`post_author`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=63 ;

--
-- Dumping data for table `wp_posts`
--

INSERT INTO `wp_posts` VALUES(1, 1, '2011-04-22 11:09:38', '2011-04-22 11:09:38', '\r\n<h2>J&amp;J makes online products.\r\nJ&amp;J earns you £$¥.\r\nJ&amp;J cares.</h2>\r\n<h2>You can work withJ&amp;J.</h2>\r\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.', '', '', 'trash', 'open', 'open', '', 'hello-world', '', '', '2011-04-23 17:07:38', '2011-04-23 17:07:38', '', 0, 'http://localhost:8888/j-j-portfolio/?p=1', 0, 'post', '', 1);
INSERT INTO `wp_posts` VALUES(2, 1, '2011-04-22 11:09:38', '2011-04-22 11:09:38', 'This is an example page. It''s different from a blog post because it will stay in one place and will show up in your site navigation (in most themes). Most people start with an About page that introduces them to potential site visitors. It might say something like this:\n\n<blockquote>Hi there! I''m a bike messenger by day, aspiring actor by night, and this is my blog. I live in Los Angeles, have a great dog named Jack, and I like pi&#241;a coladas. (And gettin'' caught in the rain.)</blockquote>\n\n...or something like this:\n\n<blockquote>The XYZ Doohickey Company was founded in 1971, and has been providing quality doohickies to the public ever since. Located in Gotham City, XYZ employs over 2,000 people and does all kinds of awesome things for the Gotham community.</blockquote>\n\nAs a new WordPress user, you should go to <a href="http://localhost:8888/j-j-portfolio/wp-admin/">your dashboard</a> to delete this page and create new pages for your content. Have fun!', 'Sample Page', '', 'publish', 'open', 'open', '', 'sample-page', '', '', '2011-04-22 11:09:38', '2011-04-22 11:09:38', '', 0, 'http://localhost:8888/j-j-portfolio/?page_id=2', 0, 'page', '', 0);
INSERT INTO `wp_posts` VALUES(57, 1, '2011-05-06 14:50:23', '2011-05-06 14:50:23', 'Information', 'Secondary Post', '', 'publish', 'open', 'open', '', 'secondary-post', '', '', '2011-05-06 14:51:04', '2011-05-06 14:51:04', '', 0, 'http://localhost:8888/j-j-portfolio/?p=57', 0, 'post', '', 0);
INSERT INTO `wp_posts` VALUES(14, 1, '2011-04-23 15:32:16', '2011-04-23 15:32:16', ' ', '', '', 'publish', 'open', 'open', '', '14', '', '', '2011-04-26 09:13:01', '2011-04-26 09:13:01', '', 0, 'http://localhost:8888/j-j-portfolio/?p=14', 3, 'nav_menu_item', '', 0);
INSERT INTO `wp_posts` VALUES(6, 1, '2011-04-22 14:55:23', '2011-04-22 14:55:23', 'Christopher Lloyd: author, historian and all-round renaissance-dude  decided to strike out from the big publishing houses and sell his most  ambitious work to date directly to his customers.', 'What on Earth Books', 'We help Chris sell more books. Hire us to sell yours!', 'trash', 'open', 'open', '', 'what-on-earth-books', '', '', '2011-04-23 17:07:31', '2011-04-23 17:07:31', '', 0, 'http://localhost:8888/j-j-portfolio/?p=6', 0, 'post', '', 0);
INSERT INTO `wp_posts` VALUES(7, 1, '2011-04-22 14:53:54', '2011-04-22 14:53:54', 'Christopher Lloyd: author, historian and all-round renaissance-dude  decided to strike out from the big publishing houses and sell his most  ambitious work to date directly to his customers.', 'What on Earth Books', '', 'inherit', 'open', 'open', '', '6-revision', '', '', '2011-04-22 14:53:54', '2011-04-22 14:53:54', '', 6, 'http://localhost:8888/j-j-portfolio/?p=7', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(8, 1, '2011-04-22 11:09:38', '2011-04-22 11:09:38', 'Welcome to WordPress. This is your first post. Edit or delete it, then start blogging!', 'Hello world!', '', 'inherit', 'open', 'open', '', '1-revision', '', '', '2011-04-22 11:09:38', '2011-04-22 11:09:38', '', 1, 'http://localhost:8888/j-j-portfolio/?p=8', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(13, 1, '2011-04-23 15:31:31', '2011-04-23 15:31:31', ' ', 'Our Work', '', 'publish', 'open', 'open', '', '13', '', '', '2011-04-26 09:13:01', '2011-04-26 09:13:01', '', 0, 'http://localhost:8888/j-j-portfolio/?p=13', 1, 'nav_menu_item', '', 0);
INSERT INTO `wp_posts` VALUES(9, 1, '2011-04-22 15:03:21', '2011-04-22 15:03:21', '<div id="mainTextPane">\n<h2>J&amp;J makes online products.\nJ&amp;J earns you £$¥.\nJ&amp;J cares.</h2>\n<h2>You can work withJ&amp;J.</h2>\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.\n\n</div>', '', '', 'inherit', 'open', 'open', '', '1-autosave', '', '', '2011-04-22 15:03:21', '2011-04-22 15:03:21', '', 1, 'http://localhost:8888/j-j-portfolio/?p=9', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(10, 1, '2011-04-22 14:57:04', '2011-04-22 14:57:04', '<div id="mainTextPane">\r\n<h2>J&amp;J makes online products.\r\nJ&amp;J earns you £$¥.\r\nJ&amp;J cares.</h2>\r\n<h2>You can work withJ&amp;J.</h2>\r\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.\r\n\r\n</div>', 'Hello world!', '', 'inherit', 'open', 'open', '', '1-revision-2', '', '', '2011-04-22 14:57:04', '2011-04-22 14:57:04', '', 1, 'http://localhost:8888/j-j-portfolio/?p=10', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(11, 1, '2011-04-22 15:01:33', '2011-04-22 15:01:33', '<div id="mainTextPane">\r\n<h2>J&amp;J earns you £$¥.\r\nJ&amp;J cares.</h2>\r\n<h2>You can work withJ&amp;J.</h2>\r\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.\r\n\r\n</div>', 'J&J makes online products.', '', 'inherit', 'open', 'open', '', '1-revision-3', '', '', '2011-04-22 15:01:33', '2011-04-22 15:01:33', '', 1, 'http://localhost:8888/j-j-portfolio/?p=11', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(12, 1, '2011-04-22 15:02:19', '2011-04-22 15:02:19', '<div id="mainTextPane">\r\n<h2>J&amp;J makes online products.\r\nJ&amp;J earns you £$¥.\r\nJ&amp;J cares.</h2>\r\n<h2>You can work withJ&amp;J.</h2>\r\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.\r\n\r\n</div>', '', '', 'inherit', 'open', 'open', '', '1-revision-4', '', '', '2011-04-22 15:02:19', '2011-04-22 15:02:19', '', 1, 'http://localhost:8888/j-j-portfolio/?p=12', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(15, 1, '2011-04-23 15:32:16', '2011-04-23 15:32:16', ' ', '', '', 'publish', 'open', 'open', '', '15', '', '', '2011-04-26 09:13:01', '2011-04-26 09:13:01', '', 0, 'http://localhost:8888/j-j-portfolio/?p=15', 2, 'nav_menu_item', '', 0);
INSERT INTO `wp_posts` VALUES(16, 1, '2011-04-23 15:33:35', '2011-04-23 15:33:35', '<h2>J&amp;J makes online products.\r\nJ&amp;J earns you £$¥.\r\nJ&amp;J cares.</h2>\r\n<h2>You can work withJ&amp;J.</h2>\r\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.', 'Home Screen', '', 'publish', 'open', 'open', '', 'home-screen', '', '', '2011-04-23 15:33:35', '2011-04-23 15:33:35', '', 0, 'http://localhost:8888/j-j-portfolio/?page_id=16', 0, 'page', '', 0);
INSERT INTO `wp_posts` VALUES(17, 1, '2011-04-23 15:33:31', '2011-04-23 15:33:31', '', 'Home Screen', '', 'inherit', 'open', 'open', '', '16-revision', '', '', '2011-04-23 15:33:31', '2011-04-23 15:33:31', '', 16, 'http://localhost:8888/j-j-portfolio/?p=17', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(62, 1, '2011-05-06 15:32:50', '2011-05-06 15:32:50', 'Christopher Lloyd: author, historian and all-round renaissance-dude decided to strike out from the big publishing houses and sell his most ambitious work to date directly to his customers.', 'What on Earth Books', 'What on Earth Books Site Design', 'inherit', 'open', 'open', '', '28-autosave', '', '', '2011-05-06 15:32:50', '2011-05-06 15:32:50', '', 28, 'http://localhost:8888/j-j-portfolio/?p=62', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(61, 1, '2011-05-06 14:52:05', '2011-05-06 14:52:05', 'Information', 'Secondary Post', '', 'inherit', 'open', 'open', '', '57-autosave', '', '', '2011-05-06 14:52:05', '2011-05-06 14:52:05', '', 57, 'http://localhost:8888/j-j-portfolio/?p=61', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(60, 1, '2011-05-06 14:50:23', '2011-05-06 14:50:23', 'Information', 'Secondary Post', '', 'inherit', 'open', 'open', '', '57-revision-2', '', '', '2011-05-06 14:50:23', '2011-05-06 14:50:23', '', 57, 'http://localhost:8888/j-j-portfolio/?p=60', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(59, 1, '2011-05-06 14:50:52', '2011-05-06 14:50:52', '', 'star', '', 'inherit', 'open', 'open', '', 'star', '', '', '2011-05-06 14:50:52', '2011-05-06 14:50:52', '', 57, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/05/star.gif', 0, 'attachment', 'image/gif', 0);
INSERT INTO `wp_posts` VALUES(28, 1, '2011-04-23 17:06:30', '2011-04-23 17:06:30', 'Christopher Lloyd: author, historian and all-round renaissance-dude decided to strike out from the big publishing houses and sell his most ambitious work to date directly to his customers. ', 'What on Earth Books', 'What on Earth Books Site Design', 'publish', 'closed', 'closed', '', 'what-on-earth-books', '', '', '2011-04-23 17:46:07', '2011-04-23 17:46:07', '', 0, 'http://localhost:8888/j-j-portfolio/?post_type=portfolio_items&p=28', 0, 'portfolio_items', '', 0);
INSERT INTO `wp_posts` VALUES(29, 1, '2011-04-22 14:55:23', '2011-04-22 14:55:23', 'Christopher Lloyd: author, historian and all-round renaissance-dude  decided to strike out from the big publishing houses and sell his most  ambitious work to date directly to his customers.', 'What on Earth Books', 'We help Chris sell more books. Hire us to sell yours!', 'inherit', 'open', 'open', '', '6-revision-2', '', '', '2011-04-22 14:55:23', '2011-04-22 14:55:23', '', 6, 'http://localhost:8888/j-j-portfolio/?p=29', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(30, 1, '2011-04-22 16:02:24', '2011-04-22 16:02:24', '\r\n<h2>J&amp;J makes online products.\r\nJ&amp;J earns you £$¥.\r\nJ&amp;J cares.</h2>\r\n<h2>You can work withJ&amp;J.</h2>\r\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.', '', '', 'inherit', 'open', 'open', '', '1-revision-5', '', '', '2011-04-22 16:02:24', '2011-04-22 16:02:24', '', 1, 'http://localhost:8888/j-j-portfolio/?p=30', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(31, 1, '2011-04-23 17:23:57', '2011-04-23 17:23:57', 'This is the Home Page of What on Earth Books', 'What On Earth Books Home Page', 'This is the Home Page of What on Earth Books', 'inherit', 'open', 'open', '', 'woe', '', '', '2011-04-23 17:23:57', '2011-04-23 17:23:57', '', 28, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/woe.gif', 0, 'attachment', 'image/gif', 0);
INSERT INTO `wp_posts` VALUES(32, 1, '2011-04-23 17:45:49', '2011-04-23 17:45:49', '', 'woe_2', '', 'inherit', 'open', 'open', '', 'woe_2', '', '', '2011-04-23 17:45:49', '2011-04-23 17:45:49', '', 28, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/woe_2.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(33, 1, '2011-04-23 17:45:52', '2011-04-23 17:45:52', '', 'woe_3', '', 'inherit', 'open', 'open', '', 'woe_3', '', '', '2011-04-23 17:45:52', '2011-04-23 17:45:52', '', 28, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/woe_3.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(34, 1, '2011-04-23 17:45:55', '2011-04-23 17:45:55', 'Sco0026632\r\nChristopher Lloyd''s WallBook by the Thames near Tower Bridge.\r\n21/10/2010', 'woe_southbank', '', 'inherit', 'open', 'open', '', 'woe_southbank', '', '', '2011-04-23 17:45:55', '2011-04-23 17:45:55', '', 28, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/woe_southbank.jpg', 0, 'attachment', 'image/jpeg', 0);
INSERT INTO `wp_posts` VALUES(35, 1, '2011-04-24 13:25:02', '2011-04-24 13:25:02', 'As part of their annual En Primeur campaign Jeroboams run this wine site which catalogues all of the major tasting notes and scores from the experts. Visitors can create a ''wishlist'' of wines they''re interested in optioning, and then the private sales team use the human touch to follow up and close a deal.', 'Jeroboams En Primeur', 'Jeroboams wine machine', 'publish', 'closed', 'closed', '', 'jeroboams-en-primeur', '', '', '2011-05-06 15:31:24', '2011-05-06 15:31:24', '', 0, 'http://localhost:8888/j-j-portfolio/?post_type=portfolio_items&p=35', 0, 'portfolio_items', '', 0);
INSERT INTO `wp_posts` VALUES(36, 1, '2011-04-24 13:22:04', '2011-04-24 13:22:04', '', 'jeroboams_1', '', 'inherit', 'open', 'open', '', 'jeroboams_1', '', '', '2011-04-24 13:22:04', '2011-04-24 13:22:04', '', 35, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/jeroboams_1.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(37, 1, '2011-04-24 13:22:15', '2011-04-24 13:22:15', '', 'jeroboams_2', '', 'inherit', 'open', 'open', '', 'jeroboams_2', '', '', '2011-04-24 13:22:15', '2011-04-24 13:22:15', '', 35, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/jeroboams_2.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(38, 1, '2011-05-06 15:04:50', '2011-05-06 15:04:50', 'As part of their annual En Primeur campaign Jeroboams run this wine site which catalogues all of the major tasting notes and scores from the experts. Visitors can create a ''wishlist'' of wines they''re interested in optioning, and then the private sales team use the human touch to follow up and close a deal.', 'Jeroboams En Primeur', 'Jeroboams wine machine', 'inherit', 'open', 'open', '', '35-autosave', '', '', '2011-05-06 15:04:50', '2011-05-06 15:04:50', '', 35, 'http://localhost:8888/j-j-portfolio/?p=38', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(39, 1, '2011-04-25 10:34:09', '2011-04-25 10:34:09', '<h2>J&amp;J makes online products.\nJ&amp;J earns you £$¥.\nJ&amp;J cares.</h2>\n<h2>You can work withJ&amp;J.</h2>\nAt the moment, we''re focussed on producing a piece of software  to change how people rent and let property. There is an introductory  site at <a href="http://property.withjandj.com/">PropertyWithJ&amp;J</a>.  In general, we design and create products for companies using the web  as the toolkit. We''ve been writing about how we think people should work  together at <a href="http://howtowork.withjandj.com/">HowToWorkWithJ&amp;J</a>.', 'Home Screen', '', 'inherit', 'open', 'open', '', '16-autosave', '', '', '2011-04-25 10:34:09', '2011-04-25 10:34:09', '', 16, 'http://localhost:8888/j-j-portfolio/?p=39', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(58, 1, '2011-05-06 14:50:14', '2011-05-06 14:50:14', '', 'Secondary Post', '', 'inherit', 'open', 'open', '', '57-revision', '', '', '2011-05-06 14:50:14', '2011-05-06 14:50:14', '', 57, 'http://localhost:8888/j-j-portfolio/?p=58', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(41, 1, '2011-04-26 10:47:29', '2011-04-26 10:47:29', '', 'How to Work', '', 'trash', 'closed', 'closed', '', 'how-to-work', '', '', '2011-04-26 10:47:35', '2011-04-26 10:47:35', '', 0, 'http://localhost:8888/j-j-portfolio/?post_type=portfolio_items&p=41', 0, 'portfolio_items', '', 0);
INSERT INTO `wp_posts` VALUES(42, 1, '2011-04-26 10:58:23', '2011-04-26 10:58:23', 'MACHINE OF CONTACT', 'Super Contact', '', 'publish', 'open', 'open', '', 'super-contact', '', '', '2011-04-26 11:04:50', '2011-04-26 11:04:50', '', 0, 'http://localhost:8888/j-j-portfolio/?p=42', 0, 'post', '', 0);
INSERT INTO `wp_posts` VALUES(48, 1, '2011-04-26 11:02:27', '2011-04-26 11:02:27', 'MACHINE OF CONTACT', 'Super Contact', '', 'inherit', 'open', 'open', '', '42-revision-3', '', '', '2011-04-26 11:02:27', '2011-04-26 11:02:27', '', 42, 'http://localhost:8888/j-j-portfolio/?p=48', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(44, 1, '2011-04-26 10:57:48', '2011-04-26 10:57:48', '', 'Super Contact', '', 'inherit', 'open', 'open', '', '42-revision', '', '', '2011-04-26 10:57:48', '2011-04-26 10:57:48', '', 42, 'http://localhost:8888/j-j-portfolio/?p=44', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(45, 1, '2011-04-26 12:34:04', '2011-04-26 12:34:04', 'MACHINE OF CONTACT', 'Super Contact', '', 'inherit', 'open', 'open', '', '42-autosave', '', '', '2011-04-26 12:34:04', '2011-04-26 12:34:04', '', 42, 'http://localhost:8888/j-j-portfolio/?p=45', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(46, 1, '2011-04-26 10:58:23', '2011-04-26 10:58:23', 'MACHINE OF CONTACT', 'Super Contact', '', 'inherit', 'open', 'open', '', '42-revision-2', '', '', '2011-04-26 10:58:23', '2011-04-26 10:58:23', '', 42, 'http://localhost:8888/j-j-portfolio/?p=46', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(47, 1, '2011-04-26 11:04:26', '2011-04-26 11:04:26', '', 'bg', '', 'inherit', 'open', 'open', '', 'bg', '', '', '2011-04-26 11:04:26', '2011-04-26 11:04:26', '', 42, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/bg.jpg', 0, 'attachment', 'image/jpeg', 0);
INSERT INTO `wp_posts` VALUES(49, 1, '2011-04-26 11:10:01', '2011-04-26 11:10:01', '', 'Avox', '', 'trash', 'open', 'open', '', 'avox', '', '', '2011-04-26 11:10:04', '2011-04-26 11:10:04', '', 0, 'http://localhost:8888/j-j-portfolio/?p=49', 0, 'post', '', 0);
INSERT INTO `wp_posts` VALUES(50, 1, '2011-04-26 11:09:33', '2011-04-26 11:09:33', '', 'avox', '', 'inherit', 'open', 'open', '', 'avox', '', '', '2011-04-26 11:09:33', '2011-04-26 11:09:33', '', 49, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/avox.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(51, 1, '2011-04-26 11:10:01', '2011-04-26 11:10:01', '', 'Avox', '', 'inherit', 'open', 'open', '', '49-revision', '', '', '2011-04-26 11:10:01', '2011-04-26 11:10:01', '', 49, 'http://localhost:8888/j-j-portfolio/?p=51', 0, 'revision', '', 0);
INSERT INTO `wp_posts` VALUES(52, 1, '2011-04-26 11:10:35', '2011-04-26 11:10:35', '', 'Avox', '', 'publish', 'closed', 'closed', '', 'avox', '', '', '2011-04-26 11:10:35', '2011-04-26 11:10:35', '', 0, 'http://localhost:8888/j-j-portfolio/?post_type=portfolio_items&p=52', 0, 'portfolio_items', '', 0);
INSERT INTO `wp_posts` VALUES(53, 1, '2011-04-26 11:10:21', '2011-04-26 11:10:21', '', 'avox', '', 'inherit', 'open', 'open', '', 'avox-2', '', '', '2011-04-26 11:10:21', '2011-04-26 11:10:21', '', 52, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/avox1.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(54, 1, '2011-04-26 11:12:37', '2011-04-26 11:12:37', 'Ambit info', 'Ambit', '', 'publish', 'closed', 'closed', '', 'ambit', '', '', '2011-04-26 12:18:53', '2011-04-26 12:18:53', '', 0, 'http://localhost:8888/j-j-portfolio/?post_type=portfolio_items&p=54', 0, 'portfolio_items', '', 0);
INSERT INTO `wp_posts` VALUES(55, 1, '2011-04-26 11:10:46', '2011-04-26 11:10:46', '', 'ambit_1', '', 'inherit', 'open', 'open', '', 'ambit_1', '', '', '2011-04-26 11:10:46', '2011-04-26 11:10:46', '', 54, 'http://localhost:8888/j-j-portfolio/wp-content/uploads/2011/04/ambit_1.png', 0, 'attachment', 'image/png', 0);
INSERT INTO `wp_posts` VALUES(56, 1, '2011-05-06 14:17:47', '2011-05-06 14:17:47', 'Ambit info', 'Ambit', '', 'inherit', 'open', 'open', '', '54-autosave', '', '', '2011-05-06 14:17:47', '2011-05-06 14:17:47', '', 54, 'http://localhost:8888/j-j-portfolio/?p=56', 0, 'revision', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `wp_terms`
--

CREATE TABLE `wp_terms` (
  `term_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
  `slug` varchar(200) NOT NULL DEFAULT '',
  `term_group` bigint(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `wp_terms`
--

INSERT INTO `wp_terms` VALUES(1, 'Uncategorized', 'uncategorized', 0);
INSERT INTO `wp_terms` VALUES(2, 'Blogroll', 'blogroll', 0);
INSERT INTO `wp_terms` VALUES(3, 'Main Menu', 'main-menu', 0);
INSERT INTO `wp_terms` VALUES(4, 'Our Work', 'our-work', 0);
INSERT INTO `wp_terms` VALUES(5, 'How we Work', 'how-we-work', 0);
INSERT INTO `wp_terms` VALUES(6, 'Hire Us', 'hire-us', 0);
INSERT INTO `wp_terms` VALUES(7, 'Contact', 'contact', 0);

-- --------------------------------------------------------

--
-- Table structure for table `wp_term_relationships`
--

CREATE TABLE `wp_term_relationships` (
  `object_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `term_taxonomy_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `term_order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`object_id`,`term_taxonomy_id`),
  KEY `term_taxonomy_id` (`term_taxonomy_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `wp_term_relationships`
--

INSERT INTO `wp_term_relationships` VALUES(1, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(2, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(3, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(4, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(5, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(6, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(7, 2, 0);
INSERT INTO `wp_term_relationships` VALUES(1, 1, 0);
INSERT INTO `wp_term_relationships` VALUES(15, 3, 0);
INSERT INTO `wp_term_relationships` VALUES(13, 3, 0);
INSERT INTO `wp_term_relationships` VALUES(6, 4, 0);
INSERT INTO `wp_term_relationships` VALUES(14, 3, 0);
INSERT INTO `wp_term_relationships` VALUES(28, 4, 0);
INSERT INTO `wp_term_relationships` VALUES(35, 4, 0);
INSERT INTO `wp_term_relationships` VALUES(49, 4, 0);
INSERT INTO `wp_term_relationships` VALUES(42, 6, 0);
INSERT INTO `wp_term_relationships` VALUES(52, 4, 0);
INSERT INTO `wp_term_relationships` VALUES(54, 4, 0);
INSERT INTO `wp_term_relationships` VALUES(57, 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wp_term_taxonomy`
--

CREATE TABLE `wp_term_taxonomy` (
  `term_taxonomy_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `term_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `taxonomy` varchar(32) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `parent` bigint(20) unsigned NOT NULL DEFAULT '0',
  `count` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`term_taxonomy_id`),
  UNIQUE KEY `term_id_taxonomy` (`term_id`,`taxonomy`),
  KEY `taxonomy` (`taxonomy`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `wp_term_taxonomy`
--

INSERT INTO `wp_term_taxonomy` VALUES(1, 1, 'category', '', 0, 0);
INSERT INTO `wp_term_taxonomy` VALUES(2, 2, 'link_category', '', 0, 7);
INSERT INTO `wp_term_taxonomy` VALUES(3, 3, 'nav_menu', '', 0, 3);
INSERT INTO `wp_term_taxonomy` VALUES(4, 4, 'category', '', 0, 4);
INSERT INTO `wp_term_taxonomy` VALUES(5, 5, 'category', '', 0, 1);
INSERT INTO `wp_term_taxonomy` VALUES(6, 6, 'category', '', 0, 1);
INSERT INTO `wp_term_taxonomy` VALUES(7, 7, 'category', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `wp_usermeta`
--

CREATE TABLE `wp_usermeta` (
  `umeta_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL DEFAULT '0',
  `meta_key` varchar(255) DEFAULT NULL,
  `meta_value` longtext,
  PRIMARY KEY (`umeta_id`),
  KEY `user_id` (`user_id`),
  KEY `meta_key` (`meta_key`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `wp_usermeta`
--

INSERT INTO `wp_usermeta` VALUES(1, 1, 'first_name', '');
INSERT INTO `wp_usermeta` VALUES(2, 1, 'last_name', '');
INSERT INTO `wp_usermeta` VALUES(3, 1, 'nickname', 'joshua');
INSERT INTO `wp_usermeta` VALUES(4, 1, 'description', '');
INSERT INTO `wp_usermeta` VALUES(5, 1, 'rich_editing', 'true');
INSERT INTO `wp_usermeta` VALUES(6, 1, 'comment_shortcuts', 'false');
INSERT INTO `wp_usermeta` VALUES(7, 1, 'admin_color', 'fresh');
INSERT INTO `wp_usermeta` VALUES(8, 1, 'use_ssl', '0');
INSERT INTO `wp_usermeta` VALUES(9, 1, 'show_admin_bar_front', 'false');
INSERT INTO `wp_usermeta` VALUES(10, 1, 'show_admin_bar_admin', 'false');
INSERT INTO `wp_usermeta` VALUES(11, 1, 'aim', '');
INSERT INTO `wp_usermeta` VALUES(12, 1, 'yim', '');
INSERT INTO `wp_usermeta` VALUES(13, 1, 'jabber', '');
INSERT INTO `wp_usermeta` VALUES(14, 1, 'wp_capabilities', 'a:1:{s:13:"administrator";s:1:"1";}');
INSERT INTO `wp_usermeta` VALUES(15, 1, 'wp_user_level', '10');
INSERT INTO `wp_usermeta` VALUES(16, 1, 'wp_dashboard_quick_press_last_post_id', '3');
INSERT INTO `wp_usermeta` VALUES(17, 1, 'wp_user-settings', 'm8=o&m5=o&m4=o&m9=c&m6=o&m1=o&hidetb=1&editor=tinymce&m10=o');
INSERT INTO `wp_usermeta` VALUES(18, 1, 'wp_user-settings-time', '1303821045');
INSERT INTO `wp_usermeta` VALUES(19, 1, 'managenav-menuscolumnshidden', 'a:4:{i:0;s:11:"link-target";i:1;s:11:"css-classes";i:2;s:3:"xfn";i:3;s:11:"description";}');
INSERT INTO `wp_usermeta` VALUES(20, 1, 'metaboxhidden_nav-menus', 'a:3:{i:0;s:8:"add-post";i:1;s:10:"add-emails";i:2;s:12:"add-post_tag";}');
INSERT INTO `wp_usermeta` VALUES(21, 1, 'closedpostboxes_post', 'a:0:{}');
INSERT INTO `wp_usermeta` VALUES(22, 1, 'metaboxhidden_post', 'a:6:{i:0;s:16:"tagsdiv-post_tag";i:1;s:13:"trackbacksdiv";i:2;s:10:"postcustom";i:3;s:16:"commentstatusdiv";i:4;s:7:"slugdiv";i:5;s:9:"authordiv";}');
INSERT INTO `wp_usermeta` VALUES(23, 1, 'nav_menu_recently_edited', '3');
INSERT INTO `wp_usermeta` VALUES(24, 1, 'closedpostboxes_portfolio_items', 'a:0:{}');
INSERT INTO `wp_usermeta` VALUES(25, 1, 'metaboxhidden_portfolio_items', 'a:1:{i:0;s:7:"slugdiv";}');

-- --------------------------------------------------------

--
-- Table structure for table `wp_users`
--

CREATE TABLE `wp_users` (
  `ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_login` varchar(60) NOT NULL DEFAULT '',
  `user_pass` varchar(64) NOT NULL DEFAULT '',
  `user_nicename` varchar(50) NOT NULL DEFAULT '',
  `user_email` varchar(100) NOT NULL DEFAULT '',
  `user_url` varchar(100) NOT NULL DEFAULT '',
  `user_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_activation_key` varchar(60) NOT NULL DEFAULT '',
  `user_status` int(11) NOT NULL DEFAULT '0',
  `display_name` varchar(250) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `user_login_key` (`user_login`),
  KEY `user_nicename` (`user_nicename`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `wp_users`
--

INSERT INTO `wp_users` VALUES(1, 'joshua', '$P$BUatQV85c.IFSqhJlYmtDG5ArwlaTV0', 'joshua', 'josh.u.war@gmail.com', '', '2011-04-22 11:09:38', '', 0, 'joshua');
