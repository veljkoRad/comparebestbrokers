### 14.08.2025

* Setting up react+ wordpress on hostinger
    1. On my Pc ```npx create-react-app .``` , than deletet all files that I don't need.
    2. ```npm run build``` , than moved that build files to hostinger dashboard.
    3. Downloaded  wordpress, moved it to **publish_html**
    4. In hostinger in databases I used already existing database, just went to phpmyadmin and deleted everything from there.
    5. From this database I use already existing database name, dabase username, and database password and inser it here:
    6. found file wp-config-sample, renamed it to wp-config and than added this credentials from step 5

* Setting up ACF pro and Custom Post Type UI
    * I went to existing brokerveiws on hostinger, found wp-content > plugin > ACF pro. Moved it to my wp and than in wp-admin/plugins I just activate it
    * Then I add New Plugin : Custom Post Type UI. Every setting for this two plugins I do on wp-admin, not on code, it's much easier.
    * Instaled **ACF to Rest API** now I can see this created ACF fields in ```https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/brokers```
    * ```https://www.tradingview.com/brokers/``` 