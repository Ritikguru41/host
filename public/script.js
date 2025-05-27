
document.getElementById("passwordForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword")
  };

  if (!data.currentPassword || !data.newPassword) {
    alert("Please fill in all fields.");
    return;
  }

  fetch("/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(result => {
      const popup = document.getElementById("popupMessage");
      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");
        window.location.reload();
      }, 2000);
    })
    .catch(() => {
      alert("❌ A network error occurred. Please try again.");
    });
});

// Show/hide password
document.getElementById('showPasswordToggle').addEventListener('change', function () {
  const type = this.checked ? 'text' : 'password';
  document.querySelector('input[name="currentPassword"]').type = type;
  document.querySelector('input[name="newPassword"]').type = type;
});

// ✅ Enhanced Log out button functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  alert("⚠️ Something went wrong. Please try again later.");
  window.location.reload(); // Refresh page after alert is closed
});
