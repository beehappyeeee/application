import ejs from 'ejs';
import express from 'express';

import PropertiesToolkit from './toolkit/PropertiesToolkit.js'
import ScheduleController from './schedule/ScheduleController.js'
import WebsiteController from './website/WebsiteController.js';

class Launcher {

    async run () {

        let app = express ();

        app.set ('view engine', ejs);
        app.use (express.json ())
        app.use (express.static ('frontend'));
        app.use (express.urlencoded ({extended: true}));
        app.use (ScheduleController);
        app.use (WebsiteController);

        let propertiesToolkit = new PropertiesToolkit ();

        let property = await propertiesToolkit.get ('server.port');
        property = process.env.PORT || property;

        app.listen (property, () => {

            console.log ('BeeHappy started on port: ' + property.toString ());

        });

        /*
                let documentToolkit = new DocumentToolkit ();
                let r = await documentToolkit.add ();
                console.log ('******************+');
                console.log (r);
                console.log ('******************+');
        */

    }

}

let launcher = new Launcher ();

await launcher.run ();