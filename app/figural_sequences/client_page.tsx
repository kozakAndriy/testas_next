'use client'
import { MouseEventHandler, useEffect, useState } from "react"
import { basegrids, baseguesses, Grid, baseAnswers, baseSelected, fillergrids4, GridGenerator } from "./generate_grid";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const defaultObjectCount: number = 3;
const maxObjectCount = 6;

export default function FiguralSequences() {
    const [grids, setGrids] = useState(basegrids);
    const [guesses, setGuesses] = useState(baseguesses);
    const [answerGiven, setAnswerGiven] = useState(false);
    const [selected, setSelected] = useState(baseSelected);

    const [gradientBackground, setGradientBackground] = useState(true);
    const [objectCount, setObjectCount] = useState(defaultObjectCount);

    function init() {
        const generator = new GridGenerator(objectCount);
        setGrids(generator.grids);
        setGuesses(generator.guesses);
    }
    useEffect(() => {
        document.body.style.background = "rgb(89, 121, 212)";
        init();
    }, []);

    function displayGrid(grid: Grid, key: number, visible: boolean, isSelected: boolean = false,
        isAnswer: boolean = false, onClick: MouseEventHandler<HTMLDivElement> | undefined = undefined): React.ReactNode {
        return <table
            key={key}
            className={`m-[0.5vw] ${visible ? "" : "invisible"} border-[3px] ${(isAnswer && answerGiven) ? "border-green-600" : isSelected ? answerGiven ? "border-red-600" : "border-blue-600" : ""}`}>
            <tbody>
                {
                    grid.map((row, r) => <tr key={r} className="m-0">
                        {
                            row.map((object, c) => <td key={c} className="p-0">
                                <div className="w-[3.5vw] max-w-[40px] h-[3.5vw] max-h-[40px] bg-white border p-[0.3vw]" onClick={onClick}>
                                    {(object == null || key >= 4) ? "" : object.display()}
                                </div>
                            </td>)
                        }
                    </tr>)
                }
            </tbody></table>
    }

    function submit() {
        setAnswerGiven(true);
    }
    function reset() {
        setAnswerGiven(false);
        setSelected(baseSelected);
        init();
    }

    return <main className="flex justify-center items-center flex-col mx-auto max-w-[1200px]">
        <section className="flex flex-row justify-evenly items-center w-full">
            {
                grids.map((grid, gridI) => displayGrid(grid, gridI, true))
            }
        </section>

        <section className="flex flex-row justify-evenly items-center w-full pb-[500px]">
            {
                fillergrids4.map((grid, gridI) => displayGrid(grid, gridI, false))
            }
            {
                guesses.map((guessForGrid, i) => <div className="flex flex-col" key={i}>
                    {
                        guessForGrid.map((grid, gridI) => displayGrid(grid, gridI, true, selected[i] == gridI, GridGenerator.isCorrect(grid, grids[4 + i]), () => {
                            setSelected(prev => prev.map((e, j) => (j == i) ? ((e == gridI) ? -1 : gridI) : e));
                        }))
                    }
                </div>)
            }
        </section>

        <section className="space-x-5 space-y-2 bg-white/60 p-5 w-full shadow-lg fixed bottom-0">
            <div className="flex justify-center space-x-5">
                <Button onClick={submit}>Submit</Button>
                <Button onClick={reset} variant='destructive'>Reset</Button>
            </div>
            <div className="flex space-x-5">
                <p>Gradient background</p>
                <Switch checked={gradientBackground} onCheckedChange={(isChecked) => {
                    document.body.style.background = isChecked ? "rgb(89, 121, 212)" : "";
                    setGradientBackground(isChecked);
                }} />
            </div>
            <div className="flex space-x-5 items-center justify-evenly">
                <span className="whitespace-nowrap">Object count: {objectCount}</span>
                <Slider min={1} max={maxObjectCount} defaultValue={[defaultObjectCount]} step={1} onValueChange={(count) => {
                    setObjectCount(count[0]);
                }} />
            </div>
        </section>

    </main >
}
