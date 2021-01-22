import Vue from 'vue'

import ElementUI from 'element-ui'

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css'

import "leaflet.icon.glyph";

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
locale.use(lang);

Vue.use(ElementUI);

