import NProgress from 'nprogress/nprogress';

const state = {
    td: {},
    loading: true,
    error: null
};

const getters = {
    getSensorByName: (state) => (name) => {
        return state.td[name]
    },
    getPropertyDetailsOfSensor: (state) => (nameOfSensor, nameOfProperty) => {
        return state.td[nameOfSensor].properties[nameOfProperty]
    }
};

const actions = {
    async fetchMockupThings({commit, state}) {
        // if(Object.keys(state.td).length === 0 && state.td.constructor === Object) {
            commit('startLoading');
            NProgress.start();
            await setTimeout(() => {
                commit('addThings', {
                    "raspberry-pi": {
                        "@context": "https://schema.iot.webizing.org/",
                        "@type": [
                            "raspberry-pi"
                        ],
                        "id": "https://.../td/AirQuality",
                        "name": "Raspberry Pi",
                        "names": "",
                        "description": "A light-emitting diode (LED) is a semiconductor light source that emits light when current flows through it.",
                        "properties": {
                            "name": {
                                "@type": "name",
                                "type": "string",
                                "title": "Name",
                                "description": "name of the sensor - format: firstName+LastName ex)jonghoLee, wanhoIm",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ airQuality {name}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "address": {
                                "@type": "address",
                                "type": "string",
                                "title": "Address",
                                "description": "building where the sensor resides - format: organization-building ex)yongjaelee-house, kist-l1, kist-l8",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ airQuality {address}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "room": {
                                "@type": "room",
                                "type": "string",
                                "title": "Room",
                                "description": "room number of the building where the sensor resides - ex) L8321",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ airQuality {room}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "location": {
                                "@type": "location",
                                "type": "string",
                                "title": "Location",
                                "description": "location of the sensor - format: free",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ airQuality {location}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "state": {
                                "@type": "temp",
                                "type": "boolean",
                                "title": "State",
                                "description": "Current state of LED, true - turn on. false - turn off",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ led {state}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            }
                        },
                        "forms": [
                            {
                                "href": "http://localhost:3000/graphql?query={ led {name  address    room   location state  }}",
                                "contentType": "application/json",
                                "op": [
                                    "readallproperties"
                                ],
                                "secure": "nosec_sc"
                            }
                        ],
                        "securityDefinitions": {
                            "nosec_sc": {
                                "scheme": "nosec",
                                "description": "no security"
                            }
                        },
                        "security": [
                            "nosec_sc"
                        ],
                        "version": {
                            "instance": "0.0.1"
                        }
                    },
                    "led": {
                        "@context": "https://schema.iot.webizing.org/",
                        "@type": [
                            "led"
                        ],
                        "id": "https://.../td/led",
                        "name": "Led Sensor",
                        "names": "",
                        "description": "A light-emitting diode (LED) is a semiconductor light source that emits light when current flows through it.",
                        "properties": {
                            "name": {
                                "@type": "name",
                                "type": "string",
                                "title": "Name",
                                "description": "name of the sensor - format: firstName+LastName ex)jonghoLee, wanhoIm",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ led {name}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "address": {
                                "@type": "address",
                                "type": "string",
                                "title": "Address",
                                "description": "building where the sensor resides - format: organization-building ex)yongjaelee-house, kist-l1, kist-l8",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ led {address}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "room": {
                                "@type": "room",
                                "type": "string",
                                "title": "Room",
                                "description": "room number of the building where the sensor resides - ex) L8321",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ led {room}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "location": {
                                "@type": "location",
                                "type": "string",
                                "title": "Location",
                                "description": "location of the sensor - format: free",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ led {location}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "state": {
                                "@type": "temp",
                                "type": "boolean",
                                "title": "State",
                                "description": "Current state of LED, true - turn on. false - turn off",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ led {state}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            }
                        },
                        "forms": [
                            {
                                "href": "http://localhost:3000/graphql?query={ led {name  address    room   location state  }}",
                                "contentType": "application/json",
                                "op": [
                                    "readallproperties"
                                ],
                                "secure": "nosec_sc"
                            }
                        ],
                        "securityDefinitions": {
                            "nosec_sc": {
                                "scheme": "nosec",
                                "description": "no security"
                            }
                        },
                        "security": [
                            "nosec_sc"
                        ],
                        "version": {
                            "instance": "0.0.1"
                        }
                    },
                    "motion": {
                        "@context": "https://schema.iot.webizing.org/",
                        "@type": [
                            "motion"
                        ],
                        "id": "https://.../td/AirQuality",
                        "name": "Motion Pir Sensor",
                        "names": "",
                        "description": "Allow you to sense motion, almost always used to detect whether a human has moved in or out of the sensors range.",
                        "properties": {
                            "name": {
                                "@type": "name",
                                "type": "string",
                                "title": "Name",
                                "description": "name of the sensor - format: firstName+LastName ex)jonghoLee, wanhoIm",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ motion {name}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "address": {
                                "@type": "address",
                                "type": "string",
                                "title": "Address",
                                "description": "building where the sensor resides - format: organization-building ex)yongjaelee-house, kist-l1, kist-l8",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ motion {address}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "room": {
                                "@type": "room",
                                "type": "string",
                                "title": "Room",
                                "description": "room number of the building where the sensor resides - ex) L8321",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ motion {room}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "location": {
                                "@type": "location",
                                "type": "string",
                                "title": "Location",
                                "description": "location of the sensor - format: free",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ motion {location}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "state": {
                                "@type": "temp",
                                "type": "boolean",
                                "title": "State",
                                "description": "Current state of motion sensor, true - motion detected. false - motion undetected",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ motion { state }}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            }
                        },
                        "forms": [
                            {
                                "href": "http://localhost:3000/graphql?query={ motion {name  address    room   location state  }}",
                                "contentType": "application/json",
                                "op": [
                                    "readallproperties"
                                ],
                                "secure": "nosec_sc"
                            }
                        ],
                        "securityDefinitions": {
                            "nosec_sc": {
                                "scheme": "nosec",
                                "description": "no security"
                            }
                        },
                        "security": [
                            "nosec_sc"
                        ],
                        "version": {
                            "instance": "0.0.1"
                        }
                    },
                    "light": {
                        "@context": "https://schema.iot.webizing.org/",
                        "@type": [
                            "light"
                        ],
                        "id": "https://.../td/AirQuality",
                        "name": "Light Sensor",
                        "names": "",
                        "description": "A light-emitting diode (LED) is a semiconductor light source that emits light when current flows through it.",
                        "properties": {
                            "name": {
                                "@type": "name",
                                "type": "string",
                                "title": "Name",
                                "description": "name of the sensor - format: firstName+LastName ex)jonghoLee, wanhoIm",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ light {name}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "address": {
                                "@type": "address",
                                "type": "string",
                                "title": "Address",
                                "description": "building where the sensor resides - format: organization-building ex)yongjaelee-house, kist-l1, kist-l8",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ light {address}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "room": {
                                "@type": "room",
                                "type": "string",
                                "title": "Room",
                                "description": "room number of the building where the sensor resides - ex) L8321",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ light {room}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "location": {
                                "@type": "location",
                                "type": "string",
                                "title": "Location",
                                "description": "location of the sensor - format: free",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ light {location}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "state": {
                                "@type": "temp",
                                "type": "boolean",
                                "title": "State",
                                "description": "Current state of Light sensor, true -light. false - dark",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ light { state }}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            }
                        },
                        "forms": [
                            {
                                "href": "http://localhost:3000/graphql?query={ light {name  address    room   location state  }}",
                                "contentType": "application/json",
                                "op": [
                                    "readallproperties"
                                ],
                                "secure": "nosec_sc"
                            }
                        ],
                        "securityDefinitions": {
                            "nosec_sc": {
                                "scheme": "nosec",
                                "description": "no security"
                            }
                        },
                        "security": [
                            "nosec_sc"
                        ],
                        "version": {
                            "instance": "0.0.1"
                        }
                    },
                    "gyroscope": {
                        "@context": "https://schema.iot.webizing.org/",
                        "@type": [
                            "gyroscope"
                        ],
                        "id": "https://.../td/AirQuality",
                        "name": "Gyroscope Sensor",
                        "names": "",
                        "description": "A light-emitting diode (LED) is a semiconductor light source that emits light when current flows through it.",
                        "properties": {
                            "name": {
                                "@type": "name",
                                "type": "string",
                                "title": "Name",
                                "description": "name of the sensor - format: firstName+LastName ex)jonghoLee, wanhoIm",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ airQuality {name}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "address": {
                                "@type": "address",
                                "type": "string",
                                "title": "Address",
                                "description": "building where the sensor resides - format: organization-building ex)yongjaelee-house, kist-l1, kist-l8",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ gyroscope {address}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "room": {
                                "@type": "room",
                                "type": "string",
                                "title": "Room",
                                "description": "room number of the building where the sensor resides - ex) L8321",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ gyroscope {room}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "location": {
                                "@type": "location",
                                "type": "string",
                                "title": "Location",
                                "description": "location of the sensor - format: free",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ gyroscope {location}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "x": {
                                "@type": "temp",
                                "type": "integer",
                                "title": "X",
                                "description": "Current state of LED, true - turn on. false - turn off",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ gyroscope {x}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "y": {
                                "@type": "y",
                                "type": "integer",
                                "title": "Y",
                                "description": "Current state of LED, true - turn on. false - turn off",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ gyroscope {y}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            },
                            "z": {
                                "@type": "z",
                                "type": "integer",
                                "title": "Z",
                                "description": "Current state of LED, true - turn on. false - turn off",
                                "forms": [
                                    {
                                        "href": "http://localhost:3000/graphql?query={ gyroscope {z}}",
                                        "contentType": "application/json",
                                        "op": [
                                            "readproperty"
                                        ],
                                        "secure": "nosec_sc"
                                    }
                                ],
                                "readOnly": true,
                                "observable": false,
                                "writeOnly": false
                            }
                        },
                        "forms": [
                            {
                                "href": "http://localhost:3000/graphql?query={ gyroscope {name  address    room   location x y z  }}",
                                "contentType": "application/json",
                                "op": [
                                    "readallproperties"
                                ],
                                "secure": "nosec_sc"
                            }
                        ],
                        "securityDefinitions": {
                            "nosec_sc": {
                                "scheme": "nosec",
                                "description": "no security"
                            }
                        },
                        "security": [
                            "nosec_sc"
                        ],
                        "version": {
                            "instance": "0.0.1"
                        }
                    }
                })
                NProgress.done();
                commit('finishLoading');
            }, 1000);



        // }
    },
    async fetchThings({commit, state}) {
        if(Object.keys(state.td).length === 0 && state.td.constructor === Object){
            commit('startLoading');
            NProgress.start()
            const response = await fetch(`http://localhost:4000/td`, {
                    headers: { Accept: "application/json",  "Content-Type":"application/json"},
                }
            );

            if (!response.ok) {
                commit('showError', response.statusText);
            } else {
                const res = await response.json();
                commit('addThings', res);
                commit('finishLoading');
                NProgress.done()
            }
        }
    },
};

const mutations = {
    addThings(state, payload) {
        state.td = payload
    },
    startLoading(state) {
        state.loading = true;
    },
    finishLoading(state) {
        state.loading = false;
    },
    showError(state, error) {
        state.error = error;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
