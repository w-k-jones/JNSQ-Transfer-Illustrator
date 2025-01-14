import Orbit from "./orbit"
import Color from "./color";

export class CelestialBody implements ICelestialBody {
    readonly id!:               number;
    readonly name!:             string;
    readonly radius!:           number;
    readonly atmosphereHeight!: number;
    readonly mass!:             number;
    readonly stdGravParam!:     number;
    readonly soi!:              number;
    readonly color!:            Color;
    readonly orbiters:          OrbitingBody[] = [];

    constructor(data: ICelestialBody) {
        this.id                 = data.id;
        this.name               = data.name;
        this.radius             = data.radius;
        this.atmosphereHeight   = data.atmosphereHeight;
        this.mass               = data.mass;
        this.stdGravParam       = data.stdGravParam;
        this.soi                = data.soi;
        this.color              = new Color(data.color);
    }

    public get data() : ICelestialBody {
        return {
            id:                 this.id,
            name:               this.name,
            radius:             this.radius,
            atmosphereHeight:   this.atmosphereHeight,
            mass:               this.mass,
            stdGravParam:       this.stdGravParam,
            soi:                this.soi,
            color:              this.color
        }
    }

    public get orbiterIds() : number[] {
        let orbIds: number[] = [];
        for(let i=0; i<this.orbiters.length; i++) {
            orbIds.push(this.orbiters[i].id)
        }
        return orbIds
    }

    public get furtherstOrbiterDistance() : number {
        let maxDist = 0.0;
        for(let i=0; i<this.orbiters.length; i++) {
            const orb = this.orbiters[i].orbit;
            const orbDist = orb.semiMajorAxis * (1 + orb.eccentricity);
            maxDist = Math.max(orbDist, maxDist)
        }
        return maxDist;
    }
}

export class OrbitingBody extends CelestialBody implements IOrbitingBody {
    readonly orbit!:            Orbit;
    readonly orbiting!:         number;

    constructor(data: IOrbitingBody, public readonly attractor: CelestialBody, anglesToRad: boolean = false) {
        super(data);
        
        this.orbit        = new Orbit(data.orbit, this.attractor, anglesToRad);
        this.orbiting     = data.orbiting;
    }

    public get data(): IOrbitingBody {
        return {
            ...super.data,
            orbit:          this.orbit.data,
            orbiting:       this.orbiting,
        };
    }
}

export function isOrbitingBody(body: ICelestialBody): body is OrbitingBody {
    return (body as OrbitingBody).orbiting !== undefined;
}

export default CelestialBody;