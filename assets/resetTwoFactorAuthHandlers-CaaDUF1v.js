import{l as e}from"./index-CCvylG8w.js";function u(r){return[e.rest.post(`${r}/auth/v1/2fa/reset`,async(a,s,t)=>s(t.status(201),t.json(""))),e.rest.post(`${r}/auth/v1/2fa/disable`,async(a,s,t)=>s(t.status(200),t.json("")))]}export{u as g};
