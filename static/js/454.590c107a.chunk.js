"use strict";(self.webpackChunkkerbal_transfer_illustrator=self.webpackChunkkerbal_transfer_illustrator||[]).push([[454],{5454:function(t,s,e){var i=e(2982),n=e(5671),r=e(3144),o=e(8613),h=e(8034),a=e(1684),u=e(8818),l=e(724),y=e(4067),c=function(){function t(s){var e=this;(0,n.Z)(this,t),this._system=void 0,this._startOrbit=void 0,this._endOrbit=void 0,this._flybyIdSequence=void 0,this._flybyBodySequence=void 0,this._startDate=void 0,this._flightTimes=void 0,this._flybyEncounterDates=void 0,this._endDate=void 0,this._startBody=void 0,this._endBody=void 0,this._transferBody=void 0,this._sequenceUp=void 0,this._sequenceDown=void 0,this._transferVelocities=void 0,this._flybyParams=void 0,this._transfers=void 0,this._ejections=void 0,this._insertions=void 0,this._flybys=void 0,this._soiPatchPositions=void 0,this._soiPatchBodies=void 0,this._flybyDurations=void 0,this._ejectionInsertionType=void 0,this._planeChange=void 0,this._matchStartMo=void 0,this._matchEndMo=void 0,this._noInsertionBurn=void 0,this._maneuvers=void 0,this._maneuverContexts=void 0,this._deltaV=void 0,this._system=s.system,this._startOrbit=s.startOrbit,this._endOrbit=s.endOrbit,this._flybyIdSequence=s.flybyIdSequence,this._flybyBodySequence=s.flybyIdSequence.map((function(t){return e.bodyFromId(t)})),this._startDate=s.startDate,this._flightTimes=s.flightTimes,this._startBody=this.bodyFromId(this._startOrbit.orbiting),this._endBody=this.bodyFromId(this._endOrbit.orbiting),this._transferBody=this.bodyFromId(this.commonAttractorId(this._startBody.id,this._endBody.id)),this._ejectionInsertionType=void 0===s.ejectionInsertionType?"fastdirect":s.ejectionInsertionType,this._planeChange=void 0!==s.planeChange&&s.planeChange,this._matchStartMo=void 0===s.matchStartMo||s.matchStartMo,this._matchEndMo=void 0!==s.matchEndMo&&s.matchEndMo,this._noInsertionBurn=void 0!==s.noInsertionBurn&&s.noInsertionBurn,this._flybyEncounterDates=[],this._flybyParams=[],this._transferVelocities=[],this._transfers=[],this._flybys=[],this._maneuvers=[],this._maneuverContexts=[],this._ejections=[],this._insertions=[],this.setSequenceUp(),this.setSequenceDown();for(var r=(0,i.Z)(this._sequenceUp.slice(0,this._sequenceUp.length-1)),o=0;o<this._flybyIdSequence.length;o++)r.push(this._flybyIdSequence[o],this._flybyIdSequence[o]);if(r.push.apply(r,(0,i.Z)(this._sequenceDown.slice(1,this._sequenceDown.length))),this._soiPatchBodies=r.map((function(t){return e.bodyFromId(t)})),s.soiPatchPositions)this._soiPatchPositions=s.soiPatchPositions;else{this._soiPatchPositions=[];for(var h=0;h<r.length;h++)this._soiPatchPositions.push((0,l.R3)(0,0,0))}var a=0;if(s.flybyDurations){this._flybyDurations=s.flybyDurations;for(var u=0;u<s.flybyDurations.length;u++)a+=s.flybyDurations[u].total}else this._flybyDurations=this._flybyIdSequence.map((function(t,s){return{inTime:0,outTime:0,total:0}}));this._endDate=this._startDate+this._flightTimes.reduce((function(t,s){return t+s}))+a,this.computeMinimalTrajectory()}return(0,r.Z)(t,[{key:"data",get:function(){return{system:this._system,startOrbit:this._startOrbit,endOrbit:this._endOrbit,startDate:this._startDate,flightTimes:this._flightTimes,endDate:this._endDate,transferBody:this._transferBody,flybyIdSequence:this._flybyIdSequence,ejections:this._ejections,insertions:this._insertions,transfers:this._transfers,flybys:this._flybys,soiPatchPositions:this._soiPatchPositions,flybyDurations:this._flybyDurations,ejectionInsertionType:this._ejectionInsertionType,planeChange:this._planeChange,matchStartMo:this._matchStartMo,matchEndMo:this._matchEndMo,noInsertionBurn:this._noInsertionBurn,maneuvers:this._maneuvers,maneuverContexts:this._maneuverContexts,deltaV:this._deltaV,patchPositionError:this.soiPatchPositionError(),patchTimeError:this.soiPatchTimeError()}}},{key:"multiFlyby",get:function(){return new o.Z(this.data)}},{key:"deltaV",get:function(){return this._deltaV}},{key:"computeMinimalTrajectory",value:function(){this.clearTrajectory(),this.computeTransferTrajectories(),this.computeFlybyParams(),this.computeEjectionTrajectories(),this.computeInsertionTrajectories(),this.computeDeltaV()}},{key:"computeFullTrajectory",value:function(){this.computeMinimalTrajectory(),this.computeFlybyOrbits(),this.setManeuvers()}},{key:"clearTrajectory",value:function(){this._flybyParams=[],this._flybys=[],this._ejections=[],this._insertions=[],this._transfers=[],this._transferVelocities=[],this._flybyEncounterDates=[],this._maneuvers=[],this._maneuverContexts=[]}},{key:"bodyFromId",value:function(t){if(0===t)return this._system.sun;var s=this._system.orbiterIds.get(t);if(!s)throw new Error("No body with id ".concat(t));return s}},{key:"sequenceToSun",value:function(t){for(var s=this.bodyFromId(t),e=[s.id];s.hasOwnProperty("orbiting");)s=this.bodyFromId(s.orbiting),e.push(s.id);return e}},{key:"commonAttractorId",value:function(t,s){for(var e=this.sequenceToSun(t),i=this.sequenceToSun(s),n=0;n<e.length;n++)if(i.includes(e[n]))return e[n];throw new Error("Bodies do not share a common attractor (error in defining this SolarSystem)")}},{key:"setSequenceUp",value:function(){for(var t=this._startBody,s=[this._startBody.id];t.id!==this._transferBody.id;){if(!t.hasOwnProperty("orbiting"))throw new Error("The start body does not orbit around the transfer body");t=this.bodyFromId(t.orbiting),s.push(t.id)}this._sequenceUp=s}},{key:"setSequenceDown",value:function(){for(var t=this._endBody,s=[this._endBody.id];t.id!==this._transferBody.id;){if(!t.hasOwnProperty("orbiting"))throw new Error("The end body does not orbit around the transfer body");t=this.bodyFromId(t.orbiting),s.push(t.id)}this._sequenceDown=s.reverse()}},{key:"computeTransferTrajectories",value:function(){for(var t=this._startDate,s=this._sequenceUp.length-2,e=0;e<this._flightTimes.length;e++){var i=t+(e>0?this._flybyDurations[e-1].total:0),n=this._flightTimes[e];t=i+n,e<this._flightTimes.length-1&&this._flybyEncounterDates.push(t);var r=0===this._sequenceUp.length?this._transferBody:0===e?this.bodyFromId(this._sequenceUp[1===this._sequenceUp.length?0:this._sequenceUp.length-2]):this._flybyBodySequence[e-1],o=e===this._flightTimes.length-1?this.bodyFromId(this._sequenceDown[1===this._sequenceDown.length?0:1]):this._flybyBodySequence[e],a=0===e&&this._startBody===this._transferBody?this._startOrbit:r.orbit,u=e===this._flightTimes.length-1&&this._endBody===this._transferBody?this._endOrbit:o.orbit,y=s<0?(0,l.R3)(0,0,0):this._soiPatchPositions[s],c=s+1>=this._soiPatchPositions.length?(0,l.R3)(0,0,0):this._soiPatchPositions[s+1];s+=2;var _=h.Z.transferTrajectory(a,u,this._transferBody,i,n,t,this._planeChange,y,c);this._transfers.push(_);var d=_.maneuvers.length;this._transferVelocities.push({velOut:_.maneuvers[0].deltaV,velIn:(0,l.zy)(_.maneuvers[d-1].deltaV,-1)})}}},{key:"computeFlybyParams",value:function(){for(var t=0;t<this._flybyIdSequence.length;t++){var s=this._transferVelocities[t].velIn,e=this._transferVelocities[t+1].velOut,i=this._flybyBodySequence[t],n=this._flybyEncounterDates[t]+this._flybyDurations[t].inTime,r=a.Z.flybyParameters({velIn:s,velOut:e,body:i,time:n});this._flybyParams.push(r)}}},{key:"computeEjectionTrajectories",value:function(){if(this._startBody.id!==this._transferBody.id){var t=this._soiPatchPositions.slice(0,this._sequenceUp.length-1);this._ejections=h.Z.ejectionTrajectories(this._system,this._startOrbit,this._transfers[0].orbits[0],this._sequenceUp,this._startDate,this._matchStartMo,this._ejectionInsertionType,t)}}},{key:"computeInsertionTrajectories",value:function(){if(this._endBody.id!==this._transferBody.id){var t=this._transfers.length,s=this._transfers[t-1].orbits.length,e=this._soiPatchPositions.slice(this._sequenceUp.length-1+2*this._flybyIdSequence.length);this._insertions=h.Z.insertionTrajectories(this._system,this._endOrbit,this._transfers[t-1].orbits[s-1],this._sequenceDown,this._endDate,this._matchEndMo,this._ejectionInsertionType,e)}}},{key:"computeDeltaV",value:function(){for(var t=0,s=0;s<this._flybyParams.length;s++)t+=this._flybyParams[s].deltaV;if(this._ejections.length>0)for(var e=0;e<this._ejections.length;e++){for(var i=1;i<this._ejections[e].maneuvers.length;i++)t+=this._ejections[e].maneuvers[i].deltaVMag;0===e&&(t+=this._ejections[e].maneuvers[0].deltaVMag)}else t+=(0,l.G7)(this._transferVelocities[0].velOut);if(this._planeChange)for(var n=0;n<this._transfers.length;n++)t+=this._transfers[n].maneuvers[1].deltaVMag;if(this._insertions.length>0)for(var r=0;r<this._insertions.length;r++){for(var o=this._insertions[r].maneuvers.length,h=0;h<o-1;h++)t+=this._insertions[r].maneuvers[h].deltaVMag;if(!this._noInsertionBurn&&r===this._insertions.length-1){var a=this._insertions[r].maneuvers.length;t+=this._insertions[r].maneuvers[a-1].deltaVMag}}else t+=(0,l.G7)(this._transferVelocities[this._transferVelocities.length-1].velIn);this._deltaV=t}},{key:"deltaError",get:function(){for(var t=0,s=0;s<this._flybyParams.length;s++)t+=this._flybyParams[s].error;return t}},{key:"computeFitness",value:function(){return void 0===this._deltaV&&this.computeDeltaV(),this._deltaV+1e6*this.deltaError}},{key:"computeFlybyOrbits",value:function(){for(var t=0;t<this._flybyParams.length;t++)this._flybys.push(a.Z.flybyFromParameters(this._flybyParams[t],this._flybyBodySequence[t]))}},{key:"setManeuvers",value:function(){if(this._maneuvers=[],this._maneuverContexts=[],this._ejections.length>0)for(var t=0;t<this._ejections.length;t++)if(0===t){for(var s,e,n=this._ejections[t].maneuvers,r=this.bodyFromId(this._ejections[t].orbits[0].orbiting).name,o=["Departure Burn"],h=0;h<n.length-1;h++)o.push("Oberth Maneuver Burn over "+r);(s=this._maneuvers).push.apply(s,(0,i.Z)(n)),(e=this._maneuverContexts).push.apply(e,o)}else{for(var a,u,l=this._ejections[t].maneuvers.slice(1),y=this.bodyFromId(this._ejections[t].orbits[0].orbiting).name,c=[],_=0;_<l.length;_++)c.push("Oberth Maneuver Burn over "+y);(a=this._maneuvers).push.apply(a,(0,i.Z)(l)),(u=this._maneuverContexts).push.apply(u,c)}else this._maneuvers.push(this._transfers[0].maneuvers[0]),this._maneuverContexts.push("Departure Burn");for(var d=0;d<this._transfers.length;d++){for(var f,v,m=this._transfers[d].maneuvers.slice(1,-1),b=[],p=0;p<m.length;p++)b.push("Plane Change Burn");if((f=this._maneuvers).push.apply(f,(0,i.Z)(m)),(v=this._maneuverContexts).push.apply(v,b),d<this._transfers.length-1){var g,P;(g=this._maneuvers).push.apply(g,(0,i.Z)(this._flybys[d].maneuvers));for(var T=[],D=0;D<this._flybys[d].maneuvers.length;D++)T.push("Flyby Burn over "+this._flybyBodySequence[d].name);(P=this._maneuverContexts).push.apply(P,T)}}if(this._insertions.length>0)for(var I=0;I<this._insertions.length;I++)if(I===this._insertions.length-1){for(var B,j,E=this._insertions[I].maneuvers,S=this.bodyFromId(this._insertions[I].orbits[0].orbiting).name,q=["Arrival Burn"],M=0;M<E.length-1;M++)q.push("Oberth Maneuver Burn over "+S);(B=this._maneuvers).push.apply(B,(0,i.Z)(E)),(j=this._maneuverContexts).push.apply(j,q)}else{for(var O,k,F=this._insertions[I].maneuvers.slice(0,-1),C=this.bodyFromId(this._insertions[I].orbits[0].orbiting).name,V=[],w=0;w<F.length;w++)V.push("Oberth Maneuver Burn over "+C);(O=this._maneuvers).push.apply(O,(0,i.Z)(F)),(k=this._maneuverContexts).push.apply(k,V)}else{var Z=this._transfers.length,x=this._transfers[Z-1].maneuvers.length;this._maneuvers.push(this._transfers[Z-1].maneuvers[x-1]),this._maneuverContexts.push("Arrival Burn")}}},{key:"calculateFlybyDurations",value:function(){for(var t=[],s=0;s<this._flybys.length;s++){var e=this._flybys[s].intersectTimes[1]-this._flybys[s].intersectTimes[0],i=this._flybys[s].intersectTimes[2]-this._flybys[s].intersectTimes[1],n=e+i;t.push({inTime:e,outTime:i,total:n})}return t}},{key:"setFlybyDurations",value:function(){this._flybyDurations=this.calculateFlybyDurations();for(var t=0,s=0;s<this._flybyDurations.length;s++)t+=this._flybyDurations[s].total;this._endDate=this._startDate+this._flightTimes.reduce((function(t,s){return t+s}))+t}},{key:"calculateSoiPatches",value:function(){for(var t=[],s=0;s<this._ejections.length;s++){var e=this._ejections[s].orbits.length,i=this._ejections[s].orbits[e-1],n=this._ejections[s].intersectTimes[e];t.push(u.Z.orbitToPositionAtDate(i,n))}for(var r=0;r<this._flybys.length;r++){var o=this._flybys[r].orbits[0],h=this._flybys[r].orbits[1],a=this._flybys[r].intersectTimes[0],l=this._flybys[r].intersectTimes[2];t.push(u.Z.orbitToPositionAtDate(o,a)),t.push(u.Z.orbitToPositionAtDate(h,l))}for(var y=0;y<this._insertions.length;y++){var c=this._insertions[y].orbits[0],_=this._insertions[y].intersectTimes[0];t.push(u.Z.orbitToPositionAtDate(c,_))}return t}},{key:"setSoiPatchPositions",value:function(){this._soiPatchPositions=this.calculateSoiPatches()}},{key:"soiPatchPositionError",value:function(){for(var t=this.calculateSoiPatches(),s=0,e=0;e<this._soiPatchPositions.length;e++)s+=(0,l.G7)((0,l.qK)(this._soiPatchPositions[e],t[e]));return s}},{key:"soiPatchUpTimeErrors",value:function(){for(var t=[],s=this._ejections.length-1,e=0;e<=s;e++){var i=this._ejections[e].orbits.length;e===s?t.push(this._ejections[e].intersectTimes[i]-this._startDate):t.push(this._ejections[e].intersectTimes[i]-this._ejections[e+1].orbits[0].epoch)}return t}},{key:"soiPatchDownTimeErrors",value:function(){for(var t=[],s=0;s<this._insertions.length;s++)if(0===s)t.push(this._insertions[s].intersectTimes[0]-this._endDate);else{var e=this._insertions[s-1].orbits.length;t.push(this._insertions[s].intersectTimes[0]-this._insertions[s-1].intersectTimes[e])}return t}},{key:"flybyEncounterTimeErrors",value:function(){for(var t=[],s=0;s<this._flybys.length;s++){var e=this._transfers[s].orbits.length;t.push(this._flybys[s].intersectTimes[0]-this._transfers[s].intersectTimes[e]),t.push(this._flybys[s].intersectTimes[2]-this._transfers[s+1].intersectTimes[0])}return t}},{key:"soiPatchTimeError",value:function(){for(var t=0,s=this.soiPatchUpTimeErrors(),e=0;e<s.length;e++)t+=Math.abs(s[e]);for(var i=this.flybyEncounterTimeErrors(),n=0;n<i.length;n++)t+=Math.abs(i[n]);for(var r=this.soiPatchDownTimeErrors(),o=0;o<r.length;o++)t+=Math.abs(r[o]);return t}},{key:"patchPositionsToAngles",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._soiPatchPositions,s=[],e=0;e<t.length;e++){var i=(0,l.jE)(t[e]);s.push(i.theta,i.phi)}return s}},{key:"setPatchPositionsFromAngles",value:function(t){for(var s=0;s<this._soiPatchBodies.length;s++)this._soiPatchPositions[s]=(0,l.io)({r:this._soiPatchBodies[s].soi,theta:t[2*s],phi:t[2*s+1]})}},{key:"optimizeSoiPatches",value:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.001,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100*this._soiPatchPositions.length;console.log("\tOptimizing flyby SoI patches"),0===(0,l.G7)(this._soiPatchPositions[0])&&(this.setSoiPatchPositions(),this.setFlybyDurations());for(var n=function(s){var e=t._soiPatchPositions.length;return t.setPatchPositionsFromAngles(s.slice(0,2*e)),t._startDate=s[2*e],t._flightTimes=s.slice(2*e+1),t.computeMinimalTrajectory(),t.computeFlybyOrbits(),t.setFlybyDurations(),t.computeFullTrajectory(),t.soiPatchPositionError()+10*t.soiPatchTimeError()+1e3*t._deltaV},r=[[].concat((0,i.Z)(this.patchPositionsToAngles()),[this._startDate],(0,i.Z)(this._flightTimes))],o=this._soiPatchBodies.length,h=0;h<o;h++){var a=r[0].slice(),u=r[0].slice();a[2*h]+=(0,l.EO)()*(Math.random()*Math.PI/24),u[2*h+1]+=(0,l.EO)()*(Math.random()*Math.PI/12),r.push(a),r.push(u)}var c=r[0].slice();c[2*o]+=(0,l.EO)()*Math.random()*this._transfers[0].orbits[0].siderealPeriod/4,r.push(c);for(var _=2*o+1,d=0;d<this._transfers.length;d++){var f=r[0].slice();f[_+d]+=Math.max(1,(0,l.EO)()*Math.random()*this._transfers[d].orbits[0].siderealPeriod/4),r.push(f)}var v=(0,y.c4)(r,n,s,e);n(v)}}]),t}();s.Z=c},8613:function(t,s,e){var i=e(5671),n=e(3144),r=e(4940),o=e(7487),h=function(){function t(s){(0,i.Z)(this,t),this.system=void 0,this.startOrbit=void 0,this.endOrbit=void 0,this.startDate=void 0,this.flightTimes=void 0,this.endDate=void 0,this.transferBody=void 0,this.flybyIdSequence=void 0,this.ejections=void 0,this.insertions=void 0,this.transfers=void 0,this.flybys=void 0,this.maneuvers=void 0,this.maneuverContexts=void 0,this.deltaV=void 0,this.soiPatchPositions=void 0,this.flybyDurations=void 0,this.ejectionInsertionType=void 0,this.planeChange=void 0,this.matchStartMo=void 0,this.matchEndMo=void 0,this.noInsertionBurn=void 0,this.patchPositionError=void 0,this.patchTimeError=void 0,this.system=new r.Z(s.system.sun,s.system.orbiters),this.startOrbit=new o.Z(s.startOrbit,this.system.bodyFromId(s.startOrbit.orbiting)),this.endOrbit=new o.Z(s.endOrbit,this.system.bodyFromId(s.endOrbit.orbiting)),this.startDate=s.startDate,this.flightTimes=s.flightTimes,s.endDate?this.endDate=s.endDate:this.endDate=s.startDate+s.flightTimes.reduce((function(t,s){return t+s})),this.transferBody=this.system.bodyFromId(s.transferBody.id),this.flybyIdSequence=s.flybyIdSequence,this.transfers=s.transfers,this.ejections=s.ejections,this.insertions=s.insertions,this.flybys=s.flybys,this.maneuvers=s.maneuvers,this.maneuverContexts=s.maneuverContexts,this.deltaV=s.deltaV,this.soiPatchPositions=s.soiPatchPositions,this.flybyDurations=s.flybyDurations,this.ejectionInsertionType=s.ejectionInsertionType,this.planeChange=s.planeChange,this.matchStartMo=s.matchStartMo,this.matchEndMo=s.matchEndMo,this.noInsertionBurn=s.noInsertionBurn,this.patchPositionError=s.patchPositionError,this.patchTimeError=s.patchTimeError}return(0,n.Z)(t,[{key:"data",get:function(){return{system:this.system,startOrbit:this.startOrbit,endOrbit:this.endOrbit,flybyIdSequence:this.flybyIdSequence,startDate:this.startDate,flightTimes:this.flightTimes,endDate:this.endDate,transferBody:this.transferBody,ejections:this.ejections,insertions:this.insertions,transfers:this.transfers,flybys:this.flybys,maneuvers:this.maneuvers,maneuverContexts:this.maneuverContexts,deltaV:this.deltaV,soiPatchPositions:this.soiPatchPositions,flybyDurations:this.flybyDurations,ejectionInsertionType:this.ejectionInsertionType,planeChange:this.planeChange,matchStartMo:this.matchStartMo,matchEndMo:this.matchEndMo,noInsertionBurn:this.noInsertionBurn,patchPositionError:this.patchPositionError,patchTimeError:this.patchTimeError}}}]),t}();s.Z=h}}]);
//# sourceMappingURL=454.590c107a.chunk.js.map