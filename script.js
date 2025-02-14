// DOM öğelerini seçme
const taskInput = document.getElementById("taskInput"); // Bu, kullanıcının görev metnini girdiği bir metin kutusudur.
const addTaskBtn = document.getElementById("addTaskBtn"); // Bu, kullanıcının görevi eklemek için tıkladığı bir düğmedir.
const taskList = document.getElementById("taskList"); // Bu, görevlerin listelendiği bir liste öğesidir.

// Görevleri saklamak için bir dizi
let tasks = [];  //bir nesne olarak bu dizide tutulacaktır. Her görevin bir id, metin ve tamamlanma durumu olacak.

// Görev ekleme fonksiyonu
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return; //kullanıcı boş bir metin girdiyse, fonksiyondan çıkar (görev eklemez).

  const newTask = {
    id: Date.now(), // şu anki zamanı milisaniye cinsinden verir).
    text: taskText, // kullanıcının girdiği metin
    completed: false, // görevin tamamlanıp tamamlanmadığını belirten bir durum
  };

  tasks.push(newTask); // yeni görevi diziye ekler
  renderTasks();  // görevleri ekrana çizer
  taskInput.value = ""; // metin kutusunu temizler
}

// Görevleri ekrana çizme fonksiyonu
function renderTasks() { // Bu fonksiyon, görevleri ekrana çizmek için kullanılır.
  taskList.innerHTML = ""; // önceki görevleri temizler
  tasks.forEach((task) => { // her görev için bir liste öğesi oluşturur ve bu öğeyi listeye ekler
    const li = document.createElement("li"); // liste öğesi oluşturur
    li.innerHTML = `    
      <span class="${task.completed ? "completed" : ""}">${task.text}</span> 
      <div>
        <button onclick="toggleTask(${task.id})">Tamamla</button> 
        <button onclick="deleteTask(${task.id})">Sil</button>
      </div>
    `; // liste öğesinin içeriğini oluşturur
    // görev metnini içeren bir span öğesi oluşturur
    taskList.appendChild(li); // liste öğesini listeye ekler
  });
}

// Görevi tamamlama fonksiyonu
function toggleTask(id) { // Bu fonksiyon, bir görevin tamamlanıp tamamlanmadığını değiştirmek için kullanılır.
  const task = tasks.find((t) => t.id === id); // id'si verilen görevi bulur
  if (task) task.completed = !task.completed; // görevin tamamlanma durumunu tersine çevirir
  renderTasks(); // görevleri ekrana çizer
}

// Görevi silme fonksiyonu
function deleteTask(id) { // Bu fonksiyon, bir görevi silmek için kullanılır.
  tasks = tasks.filter((t) => t.id !== id); // id'si verilen görevi filtreler
  renderTasks();
}

// Butona tıklama olayını dinleme
addTaskBtn.addEventListener("click", addTask); //   addTask fonksiyonunu çağırır.

// Enter tuşuna basıldığında da görev ekleme
taskInput.addEventListener("keypress", (e) => { //Bu, kullanıcının Enter tuşuna basarak görev eklemesine olanak tanır.
  if (e.key === "Enter") addTask(); // Enter tuşuna basıldığında addTask fonksiyonunu çağırır.
});