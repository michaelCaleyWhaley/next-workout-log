const requestWorkoutList = async () => {
  try {
    const readableStream = await fetch("/api/get-workout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    });
    const workoutList = await readableStream.json();
    return workoutList;
  } catch (e) {
    return { error: "unsuccessful" };
  }
};

export default requestWorkoutList;
