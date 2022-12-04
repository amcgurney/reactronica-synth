import { useState, useContext, createContext } from "react";
import { Song, Track, Instrument, Effect } from "reactronica";
import { v4 as uuidv4 } from "uuid";

const keyNotes = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

const TasksContext = createContext();

function Key({ children }) {
  const { setNotes } = useContext(TasksContext);
  const twins = [...children, ...children];
  // const triplets = [...children, ...children, ...children];
  return twins.map((keyNote, i) => {
    const octave = i < 12 ? 2 : i > 23 ? 4 : 3;
    return (
      <button
        key={uuidv4()}
        className={keyNote}
        onMouseDown={() => setNotes([{ name: keyNote + octave }])}
        onMouseUp={() => setNotes(null)}
      />
    );
  });
}

function Keys({ children }) {
  return <div className="set">{children}</div>;
}

function Synth() {
  const [notes, setNotes] = useState(null);
  const [fx, setFx] = useState({
    fuzz: 0,
    crunch: 0,
    reverb: 0
  });
  const [delay, setDelay] = useState({
    time: 0,
    feedback: 0,
    mix: 0
  });
  const [eq, setEq] = useState({
    low: 0,
    mid: 0,
    high: 0,
    mix: 0.5
  });
  const [adsr, setAdsr] = useState({
    a: 0,
    d: 5,
    s: 5,
    r: 5
  });

  return (
    <TasksContext.Provider value={{ notes, setNotes }}>
      <Keys>
        <div className="control-panel">
          <fieldset id="delay" name="delay" className="params">
            <label htmlFor="delay">Delay</label>
            <label htmlFor="delay-mix">amount</label>
            <input
              id="delay-mix"
              name="delay-mix"
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) =>
                setDelay({
                  ...delay,
                  mix: e.target.value
                })
              }
              value={delay.mix}
            />
            <label htmlFor="delay-time">time</label>
            <input
              id="delay-time"
              name="delay-time"
              type="range"
              min="0.01"
              max="1"
              step="0.1"
              onChange={(e) =>
                setDelay({
                  ...delay,
                  time: e.target.value
                })
              }
              value={delay.time}
            />
            <label htmlFor="delay-feedback">feedback</label>
            <input
              id="delay-feedback"
              name="delay-feedback"
              type="range"
              min="0"
              max="0.99"
              step="0.01"
              onChange={(e) =>
                setDelay({
                  ...delay,
                  feedback: e.target.value
                })
              }
              value={delay.feedback}
            />
          </fieldset>
          <fieldset id="fx" name="fx" className="params">
            <label htmlFor="fx">FX</label>
            <label htmlFor="reverb">reverb</label>
            <input
              id="reverb"
              name="reverb"
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => setFx({ ...fx, reverb: e.target.value })}
              value={fx.reverb}
            />
            <label htmlFor="fuzz">fuzz</label>
            <input
              id="fuzz"
              name="fuzz"
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) =>
                setFx({
                  ...fx,
                  fuzz: e.target.value
                })
              }
              value={fx.fuzz}
            />
            <label htmlFor="crunch">crunch</label>
            <input
              id="crunch"
              name="crunch"
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) =>
                setFx({
                  ...fx,
                  crunch: e.target.value
                })
              }
              value={fx.crunch}
            />
          </fieldset>
          <fieldset id="eq" name="eq" className="params">
            <label htmlFor="eq">EQ</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label htmlFor="a">low</label>
              <label htmlFor="d">mid</label>
              <label htmlFor="s">hi</label>
            </div>
            <input
              className="vertical"
              id="a"
              name="a"
              type="range"
              min="1"
              max="100"
              step="5"
              onChange={(e) =>
                setEq({
                  ...eq,
                  low: e.target.value
                })
              }
              value={eq.low}
            />
            <input
              className="vertical"
              id="d"
              name="d"
              type="range"
              min="1"
              max="100"
              step="5"
              onChange={(e) =>
                setEq({
                  ...eq,
                  mid: e.target.value
                })
              }
              value={eq.mid}
            />
            <input
              className="vertical"
              id="s"
              name="s"
              type="range"
              min="1"
              max="100"
              step="5"
              onChange={(e) =>
                setEq({
                  ...eq,
                  high: e.target.value
                })
              }
              value={eq.high}
            />
          </fieldset>
          <fieldset id="adsr" name="adsr" className="params2">
            <label htmlFor="adsr">ADSR</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label htmlFor="a">a</label>
              <label htmlFor="d">d</label>
              <label htmlFor="s">s</label>
              <label htmlFor="r">r</label>
            </div>
            <input
              className="vertical"
              id="a"
              name="a"
              type="range"
              min="0"
              max="100"
              step="5"
              onChange={(e) =>
                setAdsr({
                  ...adsr,
                  a: e.target.value
                })
              }
              value={adsr.a}
            />
            <input
              className="vertical"
              id="d"
              name="d"
              type="range"
              min="1"
              max="100"
              step="5"
              onChange={(e) =>
                setAdsr({
                  ...adsr,
                  d: e.target.value
                })
              }
              value={adsr.d}
            />
            <input
              className="vertical"
              id="s"
              name="s"
              type="range"
              min="1"
              max="100"
              step="5"
              onChange={(e) =>
                setAdsr({
                  ...adsr,
                  s: e.target.value
                })
              }
              value={adsr.s}
            />
            <input
              className="vertical"
              id="r"
              name="r"
              type="range"
              min="1"
              max="100"
              step="5"
              onChange={(e) =>
                setAdsr({
                  ...adsr,
                  r: e.target.value
                })
              }
              value={adsr.r}
            />
          </fieldset>
        </div>
        <Key>{keyNotes}</Key>
      </Keys>
      <Song volume={0}>
        <Track volume={0}>
          <Instrument
            type="monoSynth"
            notes={notes}
            envelope={{
              attack: adsr.a,
              decay: adsr.d,
              sustain: adsr.s,
              release: adsr.r
            }}
          />
          <Effect
            type="feedbackDelay"
            delayTime={delay.time}
            feedback={delay.feedback}
            wet={delay.mix}
          />
          <Effect type="freeverb" wet={fx.reverb} />
          <Effect type="distortion" wet={fx.fuzz} />
          <Effect type="bitCrusher" wet={fx.crunch} />
          <Effect
            type="eq3"
            low={eq.low}
            mid={eq.mid}
            high={eq.high}
            wet={eq.mix}
          />
        </Track>
      </Song>
    </TasksContext.Provider>
  );
}

export default Synth;