const requestWorkoutList = async (startingPos = 0, limit = 100) => {
  // console.log(startingPos, limit);
  try {
    const readableStream = await fetch(
      `/api/get-workout?startingPos=${startingPos}&limit=${limit}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      },
    );
    const workoutList = await readableStream.json();
    return workoutList;
  } catch (e) {
    return { error: "unsuccessful" };
  }
};

export default requestWorkoutList;
