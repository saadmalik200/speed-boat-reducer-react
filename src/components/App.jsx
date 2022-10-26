import { useReducer } from "react";

function App() {
  const initialState = {
    ignition: false,
    gear: 0,
    speed: 0,
  };
  const random = Math.random() < 0.5;

  const reducer = (state, action) => {
    switch (action.type) {
      case "onButton":
        if (random) {
          return { ...state, ignition: true };
        } else {
          return state;
        }

      case "gearUp":
        if (state.ignition && state.gear < 5) {
          return { ...state, gear: state.gear + 1 };
        } else {
          return state;
        }

      case "gearDown":
        if (state.ignition && state.gear > -2) {
          return { ...state, gear: state.gear - 1 };
        } else {
          return state;
        }

      case "speedUp":
        if (state.ignition && state.gear > 0) {
          if (state.gear === 1) {
            return { ...state, speed: +10 };
          } else if (state.gear === 2 && state.speed < 40) {
            return { ...state, speed: state.speed + 10 };
          } else if (state.gear === 3 && state.speed < 70) {
            return { ...state, speed: state.speed + 20 };
          } else if (state.gear === 4 && state.speed < 120) {
            return { ...state, speed: state.speed + 30 };
          } else if (state.gear === 5 && state.speed < 300) {
            return { ...state, speed: state.speed + 40 };
          } else {
            return state;
          }
        } else if (state.ignition && state.gear < 0) {
          if (state.gear === -1 && state.speed === 0) {
            return { ...state, speed: state.speed + 10 };
          } else if (state.gear === -2 && state.speed === 0) {
            return { ...state, speed: state.speed + 20 };
          } else {
            return state;
          }
        } else {
          return state;
        }

      case "speedDown":
        if (state.ignition && state.gear !== 0 && state.speed > 0) {
          return { ...state, speed: state.speed - 5 };
        } else {
          return state;
        }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);

  return (
    <div className="relative background flex bg-gray-600 justify-center items-center h-screen">
      <div className="  flex flex-col items-center justify-between">
        <div className="flex gap-[2rem]">
          <p className="absolute top-[5rem] right-[27rem] border-2 p-5 text-[1.5rem] bg-cyan-500">
            Gear: {state.gear}
          </p>
          <p className="absolute top-[5rem] left-[55rem] border-2 p-5 text-[1.5rem] bg-yellow-500">
            Status: {state.ignition ? "Switch is ON" : "Switch is OFF"}
          </p>
        </div>

        <div>
          <p className=" text-[4rem] absolute top-[28rem] left-[21rem] border-2 p-8 bg-purple-500 ">
            Speed: {state.speed}
          </p>
        </div>

        <div className="absolute bottom-[12rem]  p-5  flex justify-center items-center gap-[1rem] text-[1.5rem]">
          <button
            onClick={() => dispatch({ type: "onButton" })}
            className="border-2 p-2 bg-blue-500"
          >
            Start/Stop
          </button>
          <button
            onClick={() => dispatch({ type: "gearUp" })}
            className="border-2 p-2 bg-red-400"
          >
            Gear Up
          </button>
          <button
            onClick={() => dispatch({ type: "gearDown" })}
            className="border-2 p-2 bg-red-400"
          >
            Gear Down
          </button>
          <button
            onClick={() => dispatch({ type: "speedUp" })}
            className="border-2 p-2 bg-green-500"
          >
            Speed Up
          </button>
          <button
            onClick={() => dispatch({ type: "speedDown" })}
            className="border-2 p-2 bg-green-500"
          >
            Speed Down
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
