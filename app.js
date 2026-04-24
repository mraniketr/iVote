const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const statusEl = document.getElementById("status");
const sendOtpForm = document.getElementById("send-otp-form");
const verifyOtpForm = document.getElementById("verify-otp-form");
const sessionBox = document.getElementById("session-box");
const logoutBtn = document.getElementById("logout-btn");
const phoneInput = document.getElementById("phone");
const otpInput = document.getElementById("otp");

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function setStatus(message, tone = "") {
  statusEl.textContent = message;
  statusEl.className = `status ${tone}`.trim();
}

function setAuthenticated(isAuthenticated) {
  sendOtpForm.classList.toggle("hidden", isAuthenticated);
  verifyOtpForm.classList.add("hidden");
  sessionBox.classList.toggle("hidden", !isAuthenticated);

  if (!isAuthenticated) {
    otpInput.value = "";
  }
}

sendOtpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const phone = phoneInput.value.trim();

  if (!phone.startsWith("+")) {
    setStatus("Use E.164 format, for example +15555551234.", "error");
    return;
  }

  setStatus("Sending OTP...");

  const { error } = await supabase.auth.signInWithOtp({ phone });

  if (error) {
    setStatus(error.message, "error");
    return;
  }

  verifyOtpForm.classList.remove("hidden");
  setStatus("OTP sent. Check your mobile SMS and enter the code.", "success");
});

verifyOtpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const phone = phoneInput.value.trim();
  const token = otpInput.value.trim();

  setStatus("Verifying OTP...");

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    setStatus(error.message, "error");
    return;
  }

  if (data?.session) {
    setAuthenticated(true);
    setStatus("You are signed in.", "success");
  }
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  phoneInput.value = "";
  setAuthenticated(false);
  setStatus("Signed out.");
});

supabase.auth.getSession().then(({ data }) => {
  setAuthenticated(Boolean(data.session));
});
