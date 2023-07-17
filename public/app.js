document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "changed") {
    const id = event.target.dataset.id;
    const newTitle = prompt("новый заголовок");
    if (!newTitle) return;
    console.log("work");
    change(id, newTitle).then(() => {
      event.target.closest("li").querySelector("span").textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function change(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id,
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
