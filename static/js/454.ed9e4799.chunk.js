"use strict";(self.webpackChunkkerbal_transfer_illustrator=self.webpackChunkkerbal_transfer_illustrator||[]).push([[454],{5454:function(t,s,i){var e=i(2982),r=i(5671),n=i(3144),o=i(8613),h=i(8034),a=i(1684),l=i(8818),c=i(724),y=i(4067),u=function(){function t(s){var i=this;(0,r.Z)(this,t),this._system=void 0,this._startOrbit=void 0,this._endOrbit=void 0,this._flybyIdSequence=void 0,this._flybyBodySequence=void 0,this._startDate=void 0,this._flightTimes=void 0,this._flybyEncounterDates=void 0,this._endDate=void 0,this._startBody=void 0,this._endBody=void 0,this._transferBody=void 0,this._sequenceUp=void 0,this._sequenceDown=void 0,this._transferVelocities=void 0,this._flybyParams=void 0,this._transfers=void 0,this._ejections=void 0,this._insertions=void 0,this._flybys=void 0,this._soiPatchPositions=void 0,this._soiPatchBodies=void 0,this._flybyDurations=void 0,this._ejectionInsertionType=void 0,this._planeChange=void 0,this._matchStartMo=void 0,this._matchEndMo=void 0,this._noInsertionBurn=void 0,this._maneuvers=void 0,this._deltaV=void 0,this._system=s.system,this._startOrbit=s.startOrbit,this._endOrbit=s.endOrbit,this._flybyIdSequence=s.flybyIdSequence,this._flybyBodySequence=s.flybyIdSequence.map((function(t){return i.bodyFromId(t)})),this._startDate=s.startDate,this._flightTimes=s.flightTimes,this._startBody=this.bodyFromId(this._startOrbit.orbiting),this._endBody=this.bodyFromId(this._endOrbit.orbiting),this._transferBody=this.bodyFromId(this.commonAttractorId(this._startBody.id,this._endBody.id)),this._ejectionInsertionType=void 0===s.ejectionInsertionType?"simple":s.ejectionInsertionType,this._planeChange=void 0!==s.planeChange&&s.planeChange,this._matchStartMo=void 0===s.matchStartMo||s.matchStartMo,this._matchEndMo=void 0!==s.matchEndMo&&s.matchEndMo,this._noInsertionBurn=void 0!==s.noInsertionBurn&&s.noInsertionBurn,this._flybyEncounterDates=[],this._flybyParams=[],this._transferVelocities=[],this._transfers=[],this._flybys=[],this._maneuvers=[],this._ejections=[],this._insertions=[],this.setSequenceUp(),this.setSequenceDown();for(var n=(0,e.Z)(this._sequenceUp.slice(0,this._sequenceUp.length-1)),o=0;o<this._flybyIdSequence.length;o++)n.push(this._flybyIdSequence[o],this._flybyIdSequence[o]);if(n.push.apply(n,(0,e.Z)(this._sequenceDown.slice(1,this._sequenceDown.length))),this._soiPatchBodies=n.map((function(t){return i.bodyFromId(t)})),s.soiPatchPositions)this._soiPatchPositions=s.soiPatchPositions;else{this._soiPatchPositions=[];for(var h=0;h<n.length;h++)this._soiPatchPositions.push((0,c.R3)(0,0,0))}var a=0;if(s.flybyDurations){this._flybyDurations=s.flybyDurations;for(var l=0;l<s.flybyDurations.length;l++)a+=s.flybyDurations[l].total}else this._flybyDurations=this._flybyIdSequence.map((function(t,s){return{inTime:0,outTime:0,total:0}}));this._endDate=this._startDate+this._flightTimes.reduce((function(t,s){return t+s}))+a,this.computeMinimalTrajectory()}return(0,n.Z)(t,[{key:"data",get:function(){return{system:this._system,startOrbit:this._startOrbit,endOrbit:this._endOrbit,startDate:this._startDate,flightTimes:this._flightTimes,endDate:this._endDate,transferBody:this._transferBody,flybyIdSequence:this._flybyIdSequence,ejections:this._ejections,insertions:this._insertions,transfers:this._transfers,flybys:this._flybys,soiPatchPositions:this._soiPatchPositions,flybyDurations:this._flybyDurations,planeChange:this._planeChange,matchStartMo:this._matchStartMo,matchEndMo:this._matchEndMo,noInsertionBurn:this._noInsertionBurn,maneuvers:this._maneuvers,deltaV:this._deltaV,patchPositionError:this.soiPatchPositionError(),patchTimeError:this.soiPatchTimeError()}}},{key:"multiFlyby",get:function(){return new o.Z(this.data)}},{key:"deltaV",get:function(){return this._deltaV}},{key:"computeMinimalTrajectory",value:function(){this.clearTrajectory(),this.computeTransferTrajectories(),this.computeFlybyParams(),this.computeEjectionTrajectories(),this.computeInsertionTrajectories(),this.computeDeltaV()}},{key:"computeFullTrajectory",value:function(){this.computeMinimalTrajectory(),this.computeFlybyOrbits(),this.setManeuvers()}},{key:"clearTrajectory",value:function(){this._flybyParams=[],this._flybys=[],this._ejections=[],this._insertions=[],this._transfers=[],this._transferVelocities=[],this._flybyEncounterDates=[]}},{key:"bodyFromId",value:function(t){if(0===t)return this._system.sun;var s=this._system.orbiterIds.get(t);if(!s)throw new Error("No body with id ".concat(t));return s}},{key:"sequenceToSun",value:function(t){for(var s=this.bodyFromId(t),i=[s.id];s.hasOwnProperty("orbiting");)s=this.bodyFromId(s.orbiting),i.push(s.id);return i}},{key:"commonAttractorId",value:function(t,s){for(var i=this.sequenceToSun(t),e=this.sequenceToSun(s),r=0;r<i.length;r++)if(e.includes(i[r]))return i[r];throw new Error("Bodies do not share a common attractor (error in defining this SolarSystem)")}},{key:"setSequenceUp",value:function(){for(var t=this._startBody,s=[this._startBody.id];t.id!==this._transferBody.id;){if(!t.hasOwnProperty("orbiting"))throw new Error("The start body does not orbit around the transfer body");t=this.bodyFromId(t.orbiting),s.push(t.id)}this._sequenceUp=s}},{key:"setSequenceDown",value:function(){for(var t=this._endBody,s=[this._endBody.id];t.id!==this._transferBody.id;){if(!t.hasOwnProperty("orbiting"))throw new Error("The end body does not orbit around the transfer body");t=this.bodyFromId(t.orbiting),s.push(t.id)}this._sequenceDown=s.reverse()}},{key:"computeTransferTrajectories",value:function(){for(var t=this._startDate,s=this._sequenceUp.length-2,i=0;i<this._flightTimes.length;i++){var e=t+(i>0?this._flybyDurations[i-1].total:0),r=this._flightTimes[i];t=e+r,i<this._flightTimes.length-1&&this._flybyEncounterDates.push(t);var n=0===this._sequenceUp.length?this._transferBody:0===i?this.bodyFromId(this._sequenceUp[1===this._sequenceUp.length?0:this._sequenceUp.length-2]):this._flybyBodySequence[i-1],o=i===this._flightTimes.length-1?this.bodyFromId(this._sequenceDown[1===this._sequenceDown.length?0:1]):this._flybyBodySequence[i],a=0===i&&this._startBody===this._transferBody?this._startOrbit:n.orbit,y=i===this._flightTimes.length-1&&this._endBody===this._transferBody?this._endOrbit:o.orbit,u=s<0?(0,c.R3)(0,0,0):this._soiPatchPositions[s],_=s+1>=this._soiPatchPositions.length?(0,c.R3)(0,0,0):this._soiPatchPositions[s+1];s+=2;var f=h.Z.transferTrajectory(a,y,this._transferBody,e,r,t,this._planeChange,u,_);this._transfers.push(f);var d=f.maneuvers.length;l.Z.orbitToVelocityAtDate(a,this._transferBody,e),l.Z.orbitToVelocityAtDate(y,this._transferBody,t);this._transferVelocities.push({velOut:f.maneuvers[0].deltaV,velIn:(0,c.zy)(f.maneuvers[d-1].deltaV,-1)})}}},{key:"computeFlybyParams",value:function(){for(var t=0;t<this._flybyIdSequence.length;t++){var s=this._transferVelocities[t].velIn,i=this._transferVelocities[t+1].velOut,e=this._flybyBodySequence[t],r=this._flybyEncounterDates[t]+this._flybyDurations[t].inTime,n=a.Z.flybyParameters({velIn:s,velOut:i,body:e,time:r});this._flybyParams.push(n)}}},{key:"computeEjectionTrajectories",value:function(){if(this._startBody.id!==this._transferBody.id){var t=this._soiPatchPositions.slice(0,this._sequenceUp.length-1);this._ejections=h.Z.ejectionTrajectories(this._system,this._startOrbit,this._transfers[0].orbits[0],this._sequenceUp,this._startDate,this._matchStartMo,this._ejectionInsertionType,t)}}},{key:"computeInsertionTrajectories",value:function(){if(this._endBody.id!==this._transferBody.id){var t=this._transfers.length,s=this._transfers[t-1].orbits.length,i=this._soiPatchPositions.slice(this._sequenceUp.length-1+2*this._flybyIdSequence.length);this._insertions=h.Z.insertionTrajectories(this._system,this._endOrbit,this._transfers[t-1].orbits[s-1],this._sequenceDown,this._endDate,this._matchEndMo,this._ejectionInsertionType,i)}}},{key:"computeDeltaV",value:function(){for(var t=0,s=0;s<this._flybyParams.length;s++)t+=this._flybyParams[s].deltaV;if(this._ejections.length>0)for(var i=0;i<this._ejections.length;i++){for(var e=1;e<this._ejections[i].maneuvers.length;e++)t+=this._ejections[i].maneuvers[e].deltaVMag;0===i&&(t+=this._ejections[i].maneuvers[0].deltaVMag)}else t+=(0,c.G7)(this._transferVelocities[0].velOut);if(this._planeChange)for(var r=0;r<this._transfers.length;r++)t+=this._transfers[r].maneuvers[1].deltaVMag;if(this._insertions.length>0)for(var n=0;n<this._insertions.length;n++){for(var o=this._insertions[n].maneuvers.length,h=0;h<o-1;h++)t+=this._insertions[n].maneuvers[h].deltaVMag;if(!this._noInsertionBurn&&n===this._insertions.length-1){var a=this._insertions[n].maneuvers.length;t+=this._insertions[n].maneuvers[a-1].deltaVMag}}else t+=(0,c.G7)(this._transferVelocities[this._transferVelocities.length-1].velIn);this._deltaV=t}},{key:"deltaError",get:function(){for(var t=0,s=0;s<this._flybyParams.length;s++)t+=this._flybyParams[s].error;return t}},{key:"computeFitness",value:function(){return void 0===this._deltaV&&this.computeDeltaV(),this._deltaV+1e6*this.deltaError}},{key:"computeFlybyOrbits",value:function(){for(var t=0;t<this._flybyParams.length;t++)this._flybys.push(a.Z.flybyFromParameters(this._flybyParams[t],this._flybyBodySequence[t]))}},{key:"setManeuvers",value:function(){if(this._maneuvers=[],this._ejections.length>0)for(var t=0;t<this._ejections.length;t++){var s,i;if(0===t)(s=this._maneuvers).push.apply(s,(0,e.Z)(this._ejections[t].maneuvers));else(i=this._maneuvers).push.apply(i,(0,e.Z)(this._ejections[t].maneuvers.slice(1)))}else this._maneuvers.push(this._transfers[0].maneuvers[0]);for(var r=0;r<this._transfers.length;r++){var n,o;if((n=this._maneuvers).push.apply(n,(0,e.Z)(this._transfers[r].maneuvers.slice(1,-1))),r<this._transfers.length-1)(o=this._maneuvers).push.apply(o,(0,e.Z)(this._flybys[r].maneuvers))}if(this._insertions.length>0)for(var h=0;h<this._insertions.length;h++){var a,l;if(h===this._insertions.length-1)(a=this._maneuvers).push.apply(a,(0,e.Z)(this._insertions[h].maneuvers));else(l=this._maneuvers).push.apply(l,(0,e.Z)(this._insertions[h].maneuvers.slice(0,-1)))}else{var c=this._transfers.length,y=this._transfers[c-1].maneuvers.length;this._maneuvers.push(this._transfers[c-1].maneuvers[y-1])}}},{key:"calculateFlybyDurations",value:function(){for(var t=[],s=0;s<this._flybys.length;s++){var i=this._flybys[s].intersectTimes[1]-this._flybys[s].intersectTimes[0],e=this._flybys[s].intersectTimes[2]-this._flybys[s].intersectTimes[1],r=i+e;t.push({inTime:i,outTime:e,total:r})}return t}},{key:"setFlybyDurations",value:function(){this._flybyDurations=this.calculateFlybyDurations();for(var t=0,s=0;s<this._flybyDurations.length;s++)t+=this._flybyDurations[s].total;this._endDate=this._startDate+this._flightTimes.reduce((function(t,s){return t+s}))+t}},{key:"calculateSoiPatches",value:function(){for(var t=[],s=0;s<this._ejections.length;s++){var i=this._ejections[s].orbits.length,e=this._ejections[s].orbits[i-1],r=this._ejections[s].intersectTimes[i];t.push(l.Z.orbitToPositionAtDate(e,r))}for(var n=0;n<this._flybys.length;n++){var o=this._flybys[n].orbits[0],h=this._flybys[n].orbits[1],a=this._flybys[n].intersectTimes[0],c=this._flybys[n].intersectTimes[2];t.push(l.Z.orbitToPositionAtDate(o,a)),t.push(l.Z.orbitToPositionAtDate(h,c))}for(var y=0;y<this._insertions.length;y++){var u=this._insertions[y].orbits[0],_=this._insertions[y].intersectTimes[0];t.push(l.Z.orbitToPositionAtDate(u,_))}return t}},{key:"setSoiPatchPositions",value:function(){this._soiPatchPositions=this.calculateSoiPatches()}},{key:"soiPatchPositionError",value:function(){for(var t=this.calculateSoiPatches(),s=0,i=0;i<this._soiPatchPositions.length;i++)s+=(0,c.G7)((0,c.qK)(this._soiPatchPositions[i],t[i]));return s}},{key:"soiPatchUpTimeErrors",value:function(){for(var t=[],s=this._ejections.length-1,i=0;i<=s;i++){var e=this._ejections[i].orbits.length;i===s?t.push(this._ejections[i].intersectTimes[e]-this._startDate):t.push(this._ejections[i].intersectTimes[e]-this._ejections[i+1].orbits[0].epoch)}return t}},{key:"soiPatchDownTimeErrors",value:function(){for(var t=[],s=0;s<this._insertions.length;s++)if(0===s)t.push(this._insertions[s].intersectTimes[0]-this._endDate);else{var i=this._insertions[s-1].orbits.length;t.push(this._insertions[s].intersectTimes[0]-this._insertions[s-1].intersectTimes[i])}return t}},{key:"flybyEncounterTimeErrors",value:function(){for(var t=[],s=0;s<this._flybys.length;s++){var i=this._transfers[s].orbits.length;t.push(this._flybys[s].intersectTimes[0]-this._transfers[s].intersectTimes[i]),t.push(this._flybys[s].intersectTimes[2]-this._transfers[s+1].intersectTimes[0])}return t}},{key:"soiPatchTimeError",value:function(){for(var t=0,s=this.soiPatchUpTimeErrors(),i=0;i<s.length;i++)t+=Math.abs(s[i]);for(var e=this.flybyEncounterTimeErrors(),r=0;r<e.length;r++)t+=Math.abs(e[r]);for(var n=this.soiPatchDownTimeErrors(),o=0;o<n.length;o++)t+=Math.abs(n[o]);return t}},{key:"patchPositionsToAngles",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._soiPatchPositions,s=[],i=0;i<t.length;i++){var e=(0,c.jE)(t[i]);s.push(e.theta,e.phi)}return s}},{key:"setPatchPositionsFromAngles",value:function(t){for(var s=0;s<this._soiPatchBodies.length;s++)this._soiPatchPositions[s]=(0,c.io)({r:this._soiPatchBodies[s].soi,theta:t[2*s],phi:t[2*s+1]})}},{key:"optimizeSoiPatches",value:function(){var t=this,s=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.001,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100*this._soiPatchPositions.length;console.log("\tOptimizing flyby SoI patches"),0===(0,c.G7)(this._soiPatchPositions[0])&&(this.setSoiPatchPositions(),this.setFlybyDurations());for(var r=function(s){var i=t._soiPatchPositions.length;return t.setPatchPositionsFromAngles(s.slice(0,2*i)),t._startDate=s[2*i],t._flightTimes=s.slice(2*i+1),t.computeMinimalTrajectory(),t.computeFlybyOrbits(),t.setFlybyDurations(),t.computeFullTrajectory(),t.soiPatchPositionError()+10*t.soiPatchTimeError()+1e3*t._deltaV},n=[[].concat((0,e.Z)(this.patchPositionsToAngles()),[this._startDate],(0,e.Z)(this._flightTimes))],o=this._soiPatchBodies.length,h=0;h<o;h++){var a=n[0].slice(),l=n[0].slice();a[2*h]+=(0,c.EO)()*(Math.random()*Math.PI/24),l[2*h+1]+=(0,c.EO)()*(Math.random()*Math.PI/12),n.push(a),n.push(l)}var u=n[0].slice();u[2*o]+=(0,c.EO)()*Math.random()*this._transfers[0].orbits[0].siderealPeriod/4,n.push(u);for(var _=2*o+1,f=0;f<this._transfers.length;f++){var d=n[0].slice();d[_+f]+=Math.max(1,(0,c.EO)()*Math.random()*this._transfers[f].orbits[0].siderealPeriod/4),n.push(d)}var m=(0,y.c4)(n,r,s,i);r(m)}}]),t}();s.Z=u},8613:function(t,s,i){var e=i(5671),r=i(3144),n=i(4940),o=i(7487),h=function(){function t(s){(0,e.Z)(this,t),this.system=void 0,this.startOrbit=void 0,this.endOrbit=void 0,this.startDate=void 0,this.flightTimes=void 0,this.endDate=void 0,this.transferBody=void 0,this.flybyIdSequence=void 0,this.ejections=void 0,this.insertions=void 0,this.transfers=void 0,this.flybys=void 0,this.maneuvers=void 0,this.deltaV=void 0,this.soiPatchPositions=void 0,this.flybyDurations=void 0,this.planeChange=void 0,this.matchStartMo=void 0,this.matchEndMo=void 0,this.noInsertionBurn=void 0,this.patchPositionError=void 0,this.patchTimeError=void 0,this.system=new n.Z(s.system.sun,s.system.orbiters),this.startOrbit=new o.Z(s.startOrbit,this.system.bodyFromId(s.startOrbit.orbiting)),this.endOrbit=new o.Z(s.endOrbit,this.system.bodyFromId(s.endOrbit.orbiting)),this.startDate=s.startDate,this.flightTimes=s.flightTimes,s.endDate?this.endDate=s.endDate:this.endDate=s.startDate+s.flightTimes.reduce((function(t,s){return t+s})),this.transferBody=this.system.bodyFromId(s.transferBody.id),this.flybyIdSequence=s.flybyIdSequence,this.transfers=s.transfers,this.ejections=s.ejections,this.insertions=s.insertions,this.flybys=s.flybys,this.maneuvers=s.maneuvers,this.deltaV=s.deltaV,this.soiPatchPositions=s.soiPatchPositions,this.flybyDurations=s.flybyDurations,this.planeChange=s.planeChange,this.matchStartMo=s.matchStartMo,this.matchEndMo=s.matchEndMo,this.noInsertionBurn=s.noInsertionBurn,this.patchPositionError=s.patchPositionError,this.patchTimeError=s.patchTimeError}return(0,r.Z)(t,[{key:"data",get:function(){return{system:this.system,startOrbit:this.startOrbit,endOrbit:this.endOrbit,flybyIdSequence:this.flybyIdSequence,startDate:this.startDate,flightTimes:this.flightTimes,endDate:this.endDate,transferBody:this.transferBody,ejections:this.ejections,insertions:this.insertions,transfers:this.transfers,flybys:this.flybys,maneuvers:this.maneuvers,deltaV:this.deltaV,soiPatchPositions:this.soiPatchPositions,flybyDurations:this.flybyDurations,planeChange:this.planeChange,matchStartMo:this.matchStartMo,matchEndMo:this.matchEndMo,noInsertionBurn:this.noInsertionBurn,patchPositionError:this.patchPositionError,patchTimeError:this.patchTimeError}}}]),t}();s.Z=h}}]);
//# sourceMappingURL=454.ed9e4799.chunk.js.map