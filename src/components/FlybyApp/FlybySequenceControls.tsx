import SolarSystem from '../../main/objects/system';

import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';

function handleBodyIdChange(index: number, flybyIdSequence: number[], setFlybyIdSequence: React.Dispatch<React.SetStateAction<number[]>>) {
    return (event: any): void => {
        const newFlybyIdSequence = flybyIdSequence.slice();
        newFlybyIdSequence[index] = event.target.value;
        setFlybyIdSequence(newFlybyIdSequence);
    };
}

function createBodyItems(system: SolarSystem, startBodyId: number, endBodyId: number) {
    const transferBodyId = system.commonAttractorId(startBodyId, endBodyId);
    const transferBody = system.bodyFromId(transferBodyId);
    const options: JSX.Element[] = [];
    const bds = transferBody.orbiters;
    for (let i = 0; i < bds.length; i++) {
        options.push(<MenuItem key={bds[i].id} value={bds[i].id}>{bds[i].name}</MenuItem>)
    }
    return options;
}

function handleAddFlyby(flybyIdSequence: number[], setFlybyIdSequence: React.Dispatch<React.SetStateAction<number[]>>, system: SolarSystem, startBodyId: number, endBodyId: number) {
    return (event: any): void => {
        const transferBodyId = system.commonAttractorId(startBodyId, endBodyId);
        const transferBody = system.bodyFromId(transferBodyId);
        if(transferBody.orbiterIds.length > 0){
            const newFlybyIdSequence = flybyIdSequence.slice();
            newFlybyIdSequence.push(transferBody.orbiterIds[0]);
            setFlybyIdSequence(newFlybyIdSequence);
        }
    };
}

function handleRemoveFlyby(flybyIdSequence: number[], setFlybyIdSequence: React.Dispatch<React.SetStateAction<number[]>>) {
    return (event: any): void => {
        const newFlybyIdSequence = flybyIdSequence.slice(0,-1);
        setFlybyIdSequence(newFlybyIdSequence);
    };
}

function createBodyDropdown(bodyOptions: JSX.Element[], index: number, value: number, flybyIdSequence: number[], setFlybyIdSequence: React.Dispatch<React.SetStateAction<number[]>>) {
    const label = String(index + 1);
    const values = bodyOptions.map(m => parseInt(m.key as string))
    return (
        <FormControl key={index} sx={{ minWidth: 120 }}>
            <InputLabel id={"body-select-label-"+label}>{"Flyby #"+label}</InputLabel>
            <Select
                labelId={"body-select-label-"+label}
                label={"Flyby #"+label}
                id={'body-'+label}
                value={value}
                onChange={handleBodyIdChange(index, flybyIdSequence, setFlybyIdSequence)}
                error={isNaN(value) || !values.includes(value)}
            >
                {bodyOptions}
            </Select>
        </FormControl>
    )
}

export type FlybySequenceControlsState = {
    system:             SolarSystem,
    startBodyId:        number,
    endBodyId:          number,
    flybyIdSequence:    number[],
    setFlybyIdSequence: React.Dispatch<React.SetStateAction<number[]>>,
}

function FlybySequenceControls({system, startBodyId, endBodyId, flybyIdSequence, setFlybyIdSequence}: FlybySequenceControlsState) {
    
    const [bodyOptions, setBodyOptions] = useState(createBodyItems(system, startBodyId, endBodyId));

    useEffect(() => {
        setBodyOptions(createBodyItems(system, startBodyId, endBodyId));
      }, [system, startBodyId, endBodyId]);    


    return(
        <Stack spacing={1.5}>
            {flybyIdSequence.map((id, index) => createBodyDropdown(bodyOptions, index, id, flybyIdSequence, setFlybyIdSequence))}
            <Stack direction="row" spacing={2} textAlign="center" justifyContent="center">
                <Button variant="outlined" onClick={handleAddFlyby(flybyIdSequence, setFlybyIdSequence, system, startBodyId, endBodyId)}>
                    <AddIcon />
                </Button>
                <Button variant="outlined" onClick={handleRemoveFlyby(flybyIdSequence, setFlybyIdSequence)}>
                    <RemoveIcon />
                </Button>
            </Stack>
        </Stack>
    )
}

export default React.memo(FlybySequenceControls);