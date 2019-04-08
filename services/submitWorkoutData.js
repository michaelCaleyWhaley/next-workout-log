const submitWorkoutData = async data => {
  try {
    const readableStream = await fetch("/api/save-workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify(data),
    });
    const newWorkout = await readableStream.json();

    return newWorkout;
  } catch (e) {
    return { error: "unsuccessful" };
  }
};

export default submitWorkoutData;
