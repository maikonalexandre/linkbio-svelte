import admin from "firebase-admin";

import serviceAccount from "../../../route_meta_data.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
