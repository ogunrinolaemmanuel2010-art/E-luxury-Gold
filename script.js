    // ================= STATE =================
    let isSignup = false;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let currentUser = localStorage.getItem("currentUser");
    let cart = [];
    let checkoutSubtotal = 0;
    let currentTheme = localStorage.getItem("theme") || "dark";
    let activeFeature = null;
    let activeCategory = "All";
    let lastCustomerMessage = "";
    const whatsappNumber = "2348026270935";
    const nairaRate = 1500;
    const emailConfig = {
      publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
      serviceId: "YOUR_EMAILJS_SERVICE_ID",
      templateId: "YOUR_EMAILJS_TEMPLATE_ID"
    };

    const featureDetails = {
      insured: {
        title: "Insured Handling",
        icon: "icon-shield",
        text: "Every premium delivery option is treated as a protected handoff, with the order summary showing the delivery method before confirmation.",
        bullets: ["Insured courier option", "Protected order handling", "Clear delivery fee before payment"],
        action: "Open Checkout"
      },
      certified: {
        title: "Certified Gold",
        icon: "icon-gem",
        text: "Use this to jump into the catalog and browse pieces marked by category, grade, and reserve value.",
        bullets: ["Jewelry and bullion categories", "AU-grade product labels", "Expanded 12-piece catalog"],
        action: "Browse Collection"
      },
      dispatch: {
        title: "Priority Dispatch",
        icon: "icon-truck",
        text: "Choose delivery options during checkout, including insured courier, white-glove handoff, and pickup appointment.",
        bullets: ["Insured courier", "White-glove handoff", "Pickup appointment"],
        action: "View Delivery"
      },
      checkout: {
        title: "Secure Checkout",
        icon: "icon-card",
        text: "Checkout now supports only Paystack and bank transfer, with a transfer confirmation checkbox when bank transfer is selected.",
        bullets: ["Paystack option", "Moniepoint transfer details", "I have transferred confirmation"],
        action: "Open Cart"
      },
      concierge: {
        title: "Concierge Sourcing",
        icon: "icon-spark",
        text: "Use concierge for special requests like rare pieces, custom packaging, or gift-ready gold selections.",
        bullets: ["Special item requests", "Gift packaging notes", "Private sourcing support"],
        action: "Request Concierge"
      },
      vault: {
        title: "Vault Reserve",
        icon: "icon-shield",
        text: "Vault Reserve highlights high-value bullion and collector pieces for clients who want a more investment-focused flow.",
        bullets: ["Bullion bars", "Coin set searches", "High-value reserve pieces"],
        action: "Show Bullion"
      },
      whiteglove: {
        title: "White-Glove Delivery",
        icon: "icon-truck",
        text: "White-glove delivery is available as a checkout delivery method for customers who want appointment-style handling.",
        bullets: ["Appointment handoff", "Discreet courier note", "Premium delivery fee shown"],
        action: "Plan Delivery"
      }
    };

    // PRODUCTS
    const products = [
      { id: 1, name: "Gold Chain", price: 500, category: "Jewelry", detail: "Hand-finished curb links with a mirror-bright luxury polish.", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80" },
      { id: 2, name: "Gold Ring", price: 300, category: "Jewelry", detail: "Minimal statement ring with warm luster and everyday presence.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80" },
      { id: 3, name: "Gold Bar", price: 2000, category: "Bullion", detail: "Vault-style bullion piece for a confident reserve purchase.", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80" },
      { id: 4, name: "Gold Bracelet", price: 700, category: "Jewelry", detail: "Sculpted bracelet profile designed for occasion wear.", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80" },
      { id: 5, name: "Luxury Gold Watch", price: 1500, category: "Timepiece", detail: "Polished case, refined dial, and a collector-grade finish.", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80" },
      { id: 6, name: "Gold Earrings", price: 420, category: "Jewelry", detail: "A luminous pair for formal styling and premium gifting.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80" },
      { id: 7, name: "Gold Pendant", price: 610, category: "Jewelry", detail: "Statement pendant with a polished face and elegant weight.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80" },
      { id: 8, name: "Bullion Coin Set", price: 2800, category: "Bullion", detail: "Collector-ready coin reserve with presentation value.", image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=900&q=80" },
      { id: 9, name: "Gold Cufflinks", price: 360, category: "Accessories", detail: "Sharp formal detail for tailored evening wear.", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80" },
      { id: 10, name: "Gold Anklet", price: 390, category: "Jewelry", detail: "Delicate warm-gold profile with a soft gleam.", image: "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?auto=format&fit=crop&w=900&q=80" },
      { id: 11, name: "Heritage Necklace", price: 1250, category: "Jewelry", detail: "Layered necklace with heirloom styling and premium finish.", image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80" },
      { id: 12, name: "Reserve Ingot", price: 3400, category: "Bullion", detail: "High-value reserve piece for serious bullion collectors.", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=900&q=80" },
      { id: 13, name: "Sovereign Gold Coin", price: 980, category: "Bullion", detail: "Mint-finish single coin with collector-grade presentation.", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=900&q=80" },
      { id: 14, name: "Gold Signet Ring", price: 540, category: "Jewelry", detail: "Classic signet profile with a smooth, high-polish face.", image: "https://images.unsplash.com/photo-1588444650733-d53f0f4f8b8d?auto=format&fit=crop&w=900&q=80" },
      { id: 15, name: "Executive Tie Clip", price: 295, category: "Accessories", detail: "Formal gold-tone tie clip for premium tailored looks.", image: "https://images.unsplash.com/photo-1594917797395-9c7f2f03e0f0?auto=format&fit=crop&w=900&q=80" }
    ];

    // ================= INIT =================
    applyTheme(currentTheme, false);
    initEmailService();

    if (currentUser) {
      showApp();
    }

    document.querySelectorAll('input[name="payment"]').forEach(option => {
      option.addEventListener("change", updatePaymentMethod);
    });
    updatePaymentMethod();

    // ================= POPOUTS =================
    function notify(title, message, type = "info") {
      const stack = document.getElementById("toastStack");
      const toast = document.createElement("div");
      const icon = type === "error" ? "icon-close" : type === "success" ? "icon-check" : "icon-spark";
      toast.className = "toast " + type;
      toast.innerHTML = `
    <div class="toast-icon"><svg class="icon"><use href="#${icon}"></use></svg></div>
    <div><strong>${title}</strong><span>${message}</span></div>
  `;
      stack.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        setTimeout(() => toast.remove(), 220);
      }, 3200);
    }

    function showLoading(message = "Please wait...") {
      const overlay = document.getElementById("loadingOverlay");
      const text = document.getElementById("loadingText");
      if (text) text.innerText = message;
      if (overlay) overlay.classList.remove("hidden");
    }

    function hideLoading() {
      const overlay = document.getElementById("loadingOverlay");
      if (overlay) overlay.classList.add("hidden");
    }

    function runWithLoading(message, action, delay = 700) {
      showLoading(message);
      setTimeout(() => {
        try {
          action();
        } finally {
          hideLoading();
        }
      }, delay);
    }

    function formatMoney(amount) {
      amount = Number(amount || 0);
      return "$" + amount.toLocaleString() + " / â‚¦" + (amount * nairaRate).toLocaleString();
    }

    function formatNaira(amount) {
      amount = Number(amount || 0);
      return "â‚¦" + (amount * nairaRate).toLocaleString();
    }

    function getRandomDeliveryDate() {
      const daysToAdd = Math.floor(Math.random() * 7) + 3;
      const date = new Date();
      date.setDate(date.getDate() + daysToAdd);
      return date.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }

    function toggleChat() {
      const chat = document.getElementById("chatWindow");
      chat.classList.toggle("hidden");
      if (!chat.classList.contains("hidden")) {
        setTimeout(() => document.getElementById("chatInput").focus(), 80);
      }
    }

    function appendChatMessage(message, sender = "bot") {
      const messages = document.getElementById("chatMessages");
      const avatar = sender === "bot" ? `<div class="chat-avatar">A</div>` : "";
      messages.innerHTML += `
    <div class="chat-row ${sender}">
      ${avatar}
      <div class="chat-bubble">${message}</div>
    </div>
  `;
      messages.scrollTop = messages.scrollHeight;
    }

    function sendChatMessage(event) {
      event.preventDefault();
      const input = document.getElementById("chatInput");
      const message = input.value.trim();
      if (!message) return;

      lastCustomerMessage = message;
      appendChatMessage(message, "user");
      input.value = "";

      setTimeout(() => {
        appendChatMessage(getAuriReply(message), "bot");
      }, 450);
    }

    function getAuriReply(message) {
      const text = message.toLowerCase();

      if (text.includes("price") || text.includes("cost") || text.includes("how much")) {
        return "You can search the catalog by item name or category. Product prices are shown on every card, and checkout gives a final total with delivery.";
      }

      if (text.includes("bank") || text.includes("transfer") || text.includes("account")) {
        return "For bank transfer, use Moniepoint account 8026270935, account name Ogunrinola Emmanuel. After paying, tick 'I've transferred the money' at checkout.";
      }

      if (text.includes("paystack") || text.includes("card")) {
        return "Paystack is available as a checkout method. A live Paystack popup can be connected once your public key is added.";
      }

      if (text.includes("delivery") || text.includes("dispatch") || text.includes("shipping")) {
        return "Delivery options include insured courier, white-glove handoff, and pickup appointment. You can select the method inside checkout.";
      }

      if (text.includes("search") || text.includes("find")) {
        return "Use the search bar at the top or the catalog search section. You can search ring, bullion, watch, chain, jewelry, or accessories.";
      }

      if (text.includes("call") || text.includes("concierge") || text.includes("custom")) {
        return "I can help with special requests. Click 'Book a free call' or add your request in the checkout concierge note.";
      }

      return "Hi there! How can I assist you today? You can ask about products, pricing, delivery, Paystack, bank transfer, or custom gold requests.";
    }

    function bookFreeCall() {
      lastCustomerMessage = "I would like to book a free call.";
      appendChatMessage("I would like to book a free call.", "user");
      setTimeout(() => {
        appendChatMessage("Perfect. Please leave your phone number in checkout, or message your preferred call time here and our concierge will follow up.", "bot");
      }, 450);
    }

    function openWhatsApp() {
      const message = lastCustomerMessage
        ? `Hello Ogunrinola Emmanuel, I am contacting you from E-gold luxury. My message: ${lastCustomerMessage}`
        : "Hello Ogunrinola Emmanuel, I am contacting you from E-gold luxury. I need help with a gold order.";
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }

    function scrollToProducts() {
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
    }

    function setSearch(value) {
      activeCategory = "All";
      const headerSearch = document.getElementById("productSearch");
      const catalogSearch = document.getElementById("catalogSearch");
      if (headerSearch) headerSearch.value = value;
      if (catalogSearch) catalogSearch.value = value;
      updateActiveChip();
      renderProducts();
      scrollToProducts();
    }

    function searchCategory(category) {
      activeCategory = category;
      const headerSearch = document.getElementById("productSearch");
      const catalogSearch = document.getElementById("catalogSearch");
      const value = category === "All" ? "" : category;
      if (headerSearch) headerSearch.value = value;
      if (catalogSearch) catalogSearch.value = value;
      updateActiveChip();
      renderProducts();
      scrollToProducts();
    }

    function syncSearch(source) {
      const headerSearch = document.getElementById("productSearch");
      const catalogSearch = document.getElementById("catalogSearch");
      const value = source === "header" ? headerSearch.value : catalogSearch.value;
      activeCategory = "All";
      if (source === "header" && catalogSearch) catalogSearch.value = value;
      if (source === "catalog" && headerSearch) headerSearch.value = value;
      updateActiveChip();
      renderProducts();
    }

    function updateActiveChip() {
      document.querySelectorAll(".chip").forEach(chip => {
        chip.classList.toggle("active", chip.dataset.category === activeCategory);
      });
    }

    function openFeature(key) {
      const feature = featureDetails[key];
      activeFeature = key;
      document.getElementById("featureTitle").innerText = feature.title;
      document.getElementById("featureIcon").setAttribute("href", "#" + feature.icon);
      document.getElementById("featureText").innerText = feature.text;
      document.getElementById("featureList").innerHTML = feature.bullets.map(item =>
        `<li><svg class="icon"><use href="#icon-check"></use></svg>${item}</li>`
      ).join("");
      document.getElementById("featureAction").innerHTML =
        `<svg class="icon"><use href="#icon-check"></use></svg>${feature.action}`;
      document.getElementById("featureOverlay").classList.remove("hidden");
    }

    function closeFeature() {
      document.getElementById("featureOverlay").classList.add("hidden");
    }

    function runFeatureAction() {
      closeFeature();

      if (activeFeature === "checkout") {
        toggleCart();
        return;
      }

      if (activeFeature === "insured" || activeFeature === "dispatch" || activeFeature === "whiteglove") {
        if (cart.length === 0) {
          notify("Add an item first", "Choose at least one gold piece before planning delivery.", "error");
          scrollToProducts();
          return;
        }
        checkout();
        if (activeFeature === "whiteglove" || activeFeature === "dispatch") {
          document.getElementById("deliveryMethod").value = activeFeature === "whiteglove" ? "140" : "75";
          updateCheckoutTotals();
        }
        return;
      }

      if (activeFeature === "vault") {
        document.getElementById("productSearch").value = "bullion";
        renderProducts();
        scrollToProducts();
        return;
      }

      if (activeFeature === "concierge") {
        notify("Concierge request noted", "Add your custom request in the checkout concierge note after selecting an item.", "success");
        scrollToProducts();
        return;
      }

      scrollToProducts();
    }

    // ================= AUTH =================
    function toggleAuth() {
      isSignup = !isSignup;

      document.getElementById("authTitle").innerText =
        isSignup ? "Sign Up" : "Sign In";

      document.getElementById("switchText").innerText =
        isSignup
          ? "Already have account? Sign In"
          : "Don't have account? Sign Up";

    }

    function handleAuth() {
      runWithLoading(isSignup ? "Creating your account..." : "Signing you in...", () => {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
          notify("Missing details", "Fill in your email address and password to continue.", "error");
          return;
        }

        if (!username.includes("@") || !username.includes(".")) {
          notify("Email needed", "Enter a valid email address.", "error");
          return;
        }

        if (isSignup) {
          const exists = users.find(u => u.username === username);
          if (exists) {
            notify("Client already exists", "Switch to sign in or choose another email address.", "error");
            return;
          }

          users.push({ username, password, createdAt: new Date().toISOString() });
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("currentUser", username);
          currentUser = username;

          showApp();
          notify("Account created", "Your private E-gold luxury access is ready.", "success");
        } else {
          const user = users.find(
            u => u.username === username && u.password === password
          );

          if (!user) {
            notify("Invalid login", "Check your email address and password, then try again.", "error");
            return;
          }

          localStorage.setItem("currentUser", username);
          currentUser = username;

          showApp();
          notify("Signed in", "Welcome back to your luxury gold marketplace.", "success");
        }
      });
    }

    // ================= APP =================
    function showApp() {
      document.getElementById("authPage").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
      document.getElementById("profileName").innerText = currentUser || "Client";
      document.getElementById("profileInitial").innerText = (currentUser || "E").charAt(0).toUpperCase();
      updateProfileDetails();

      cart = [];
      renderProducts();
      updateCart();
    }

    function toggleProfile() {
      const menu = document.getElementById("profileMenu");
      menu.classList.toggle("hidden");
    }

    function updateProfileDetails() {
      const user = users.find(u => u.username === currentUser);
      const createdAt = user && user.createdAt ? new Date(user.createdAt) : new Date();
      document.getElementById("profileSince").innerText = createdAt.toLocaleDateString(undefined, {
        month: "short",
        year: "numeric"
      });
      document.getElementById("profileOrderCount").innerText = getUserOrders().length;
    }

    function applyTheme(theme) {
      currentTheme = theme;
      document.body.classList.toggle("light-mode", theme === "light");
      localStorage.setItem("theme", theme);
      const label = document.getElementById("themeLabel");
      if (label) {
        label.innerText = theme === "light" ? "Light mode" : "Dark mode";
      }
    }

    function toggleTheme() {
      applyTheme(currentTheme === "light" ? "dark" : "light");
    }

    function logout() {
      runWithLoading("Signing you out...", () => {
        notify("Logging out", "Your session is closing now.", "success");
        localStorage.removeItem("currentUser");
        setTimeout(() => location.reload(), 850);
      }, 650);
    }

    // ================= ORDERS =================
    function getUserOrders() {
      return orders.filter(order => order.user === currentUser);
    }

    function saveOrder(order) {
      orders.unshift(order);
      localStorage.setItem("orders", JSON.stringify(orders));
      updateProfileDetails();
    }

    function openOrders() {
      document.getElementById("ordersOverlay").classList.remove("hidden");
      document.getElementById("ordersTitle").innerText = "My Orders";
      renderOrders();
    }

    function closeOrders() {
      document.getElementById("ordersOverlay").classList.add("hidden");
    }

    function renderOrders() {
      const list = document.getElementById("ordersList");
      const visibleOrders = getUserOrders();

      if (visibleOrders.length === 0) {
        list.innerHTML = `
      <div class="empty-orders">
        <strong>No orders yet</strong><br>
        Orders will appear here after checkout is completed.
      </div>
    `;
        return;
      }

      list.innerHTML = visibleOrders.map(order => `
    <div class="order-card">
      <div class="order-top">
        <div>
          <strong>${order.id}</strong>
          <span>${order.date} Â· ${order.user}</span>
        </div>
        <div class="order-status">${order.status}</div>
      </div>
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
            <span>${item.name} <small>(${item.category})</small></span>
            <strong>${formatMoney(item.price)}</strong>
          </div>
        `).join("")}
      </div>
      <div class="order-details">
        <div><span>Total</span><b>${formatMoney(order.grandTotal)}</b></div>
        <div><span>Payment</span><b>${order.payment}</b></div>
        <div><span>Phone</span><b>${order.phone}</b></div>
        <div><span>Email</span><b>${order.email || "Not provided"}</b></div>
        <div><span>Delivery</span><b>${order.deliveryLabel}</b></div>
        <div><span>Delivery Date</span><b>${order.deliveryDate || "Pending"}</b></div>
        <div><span>City</span><b>${order.city}</b></div>
        <div><span>Address</span><b>${order.address}</b></div>
        <div><span>Mail Message</span><b>${order.emailMessage || "Receipt saved in My Orders."}</b></div>
      </div>
      <div class="order-actions">
        <button class="secondary-btn" onclick="openEmailReceipt('${order.id}')"><svg class="icon"><use href="#icon-card"></use></svg> Open Email Receipt</button>
      </div>
    </div>
  `).join("");
    }

    function openEmailReceipt(orderId) {
      const order = orders.find(item => item.id === orderId);
      if (!order || !order.email) {
        notify("Email unavailable", "This order does not have an email address attached.", "error");
        return;
      }

      const subject = `E-gold luxury receipt ${order.id}`;
      const body = [
        order.emailMessage,
        "",
        `Order ID: ${order.id}`,
        `Total: ${formatMoney(order.grandTotal)}`,
        `Payment: ${order.payment}`,
        `Delivery: ${order.deliveryLabel}`,
        `Estimated delivery date: ${order.deliveryDate}`,
        `Delivery address: ${order.address}, ${order.city}`,
        "",
        "Thank you for ordering from E-gold luxury."
      ].join("\n");

      window.location.href = `mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    // ================= PRODUCTS =================
    function renderProducts() {
      const container = document.getElementById("products");
      const searchInput = document.getElementById("productSearch");
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const filteredProducts = products.filter(p =>
        (activeCategory === "All" || p.category === activeCategory) &&
        (
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.detail.toLowerCase().includes(query)
        )
      );
      container.innerHTML = "";

      const summary = document.getElementById("searchSummary");
      if (summary) {
        summary.innerText = query
          ? `Showing ${filteredProducts.length} result(s) for "${query}".`
          : `Showing ${filteredProducts.length} premium piece(s).`;
      }

      if (filteredProducts.length === 0) {
        container.innerHTML = `
      <div class="empty-results">
        <strong>No gold found</strong>
        Try another search like ring, bullion, watch, jewelry, or chain.
      </div>
    `;
        return;
      }

      filteredProducts.forEach(p => {
        container.innerHTML += `
      <div class="card">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
          <span class="product-badge"><svg class="icon"><use href="#icon-gem"></use></svg>${p.category}</span>
        </div>
        <div class="card-content">
          <span class="certified">Certified reserve</span>
          <h4>${p.name}</h4>
          <p class="product-meta">${p.detail}</p>
          <div class="price-row">
            <span class="price">$${p.price.toLocaleString()}<small>${formatNaira(p.price)}</small></span>
            <span class="certified">AU grade</span>
          </div>
          <button class="primary-btn" onclick="addToCart(${p.id})"><svg class="icon"><use href="#icon-cart"></use></svg>Add to Cart</button>
        </div>
      </div>
    `;
      });
    }

    // ================= CART =================
    function addToCart(id) {
      const item = products.find(p => p.id === id);
      cart.push(item);
      updateCart();
      notify("Added to cart", `${item.name} has joined your reserve.`, "success");
    }

    function updateCart() {
      document.getElementById("cartBtn").innerHTML =
        `<svg class="icon"><use href="#icon-cart"></use></svg> Cart (${cart.length})`;
      document.getElementById("profileCartCount").innerText = cart.length;
      document.getElementById("profileCartTotal").innerText =
        formatMoney(cart.reduce((sum, item) => sum + item.price, 0));

      const list = document.getElementById("cartItems");
      list.innerHTML = "";

      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;

        list.innerHTML += `
      <li>
        <div class="item-main">
          <img class="item-thumb" src="${item.image}" alt="${item.name}">
          <div><span>${item.name}</span><small>${item.category}</small></div>
        </div>
        <strong>${formatMoney(item.price)}</strong>
        <button class="cart-remove" onclick="removeItem(${index})" aria-label="Remove ${item.name}"><svg class="icon"><use href="#icon-close"></use></svg></button>
      </li>
    `;
      });

      if (cart.length === 0) {
        list.innerHTML = `<li><span>Your cart is waiting for its first piece.</span></li>`;
      }

      document.getElementById("total").innerText =
        formatMoney(total);
    }

    function removeItem(index) {
      const removed = cart[index];
      cart.splice(index, 1);
      updateCart();
      notify("Removed from cart", `${removed.name} was removed from your reserve.`, "success");
    }

    function toggleCart() {
      const overlay = document.getElementById("cartOverlay");
      overlay.classList.toggle("hidden");
    }

    // ================= CHECKOUT =================
    function checkout() {
      if (cart.length === 0) {
        notify("Cart is empty", "Add at least one gold item before checkout.", "error");
        return;
      }

      runWithLoading("Preparing checkout...", () => {
        document.getElementById("app").classList.add("hidden");
        document.getElementById("cartOverlay").classList.add("hidden");
        document.getElementById("checkoutPage").classList.remove("hidden");

        const list = document.getElementById("checkoutItems");
        list.innerHTML = "";

        checkoutSubtotal = 0;

        cart.forEach(item => {
          checkoutSubtotal += item.price;
          list.innerHTML += `
      <li>
        <div class="item-main">
          <img class="item-thumb" src="${item.image}" alt="${item.name}">
          <div><span>${item.name}</span><small>${item.category}</small></div>
        </div>
        <strong>${formatMoney(item.price)}</strong>
      </li>`;
        });

        updateCheckoutTotals();
      }, 550);
    }

    function updateCheckoutTotals() {
      const delivery = Number(document.getElementById("deliveryMethod").value);
      document.getElementById("checkoutTotal").innerText =
        formatMoney(checkoutSubtotal);
      document.getElementById("checkoutDelivery").innerText =
        formatMoney(delivery);
      document.getElementById("grandTotal").innerText =
        formatMoney(checkoutSubtotal + delivery);
    }

    function updatePaymentMethod() {
      const payment = document.querySelector('input[name="payment"]:checked').value;
      const bankDetails = document.getElementById("bankDetails");
      bankDetails.classList.toggle("active", payment === "Bank transfer");

    }

    function placeOrder() {
      runWithLoading("Placing your order...", () => {
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const countryCode = document.getElementById("countryCode").value;
        const city = document.getElementById("city").value.trim();
        const deliverySelect = document.getElementById("deliveryMethod");
        const payment = document.querySelector('input[name="payment"]:checked').value;

        if (!address || !email || !phone || !city) {
          notify("Delivery details needed", "Fill address, email, city, and phone number to place the order.", "error");
          return;
        }

        if (!email.includes("@") || !email.includes(".")) {
          notify("Email needed", "Enter a valid email address for the order receipt.", "error");
          return;
        }

        const delivery = Number(deliverySelect.value);
        const grandTotal = checkoutSubtotal + delivery;
        const fullPhone = `${countryCode} ${phone.replace(/^0+/, "")}`;
        const deliveryDate = getRandomDeliveryDate();
        const emailMessage = `Hello ${currentUser || "customer"}, your E-gold luxury order is confirmed. Order total: ${formatMoney(grandTotal)}. Estimated delivery date: ${deliveryDate}.`;
        const order = {
          id: "AH-" + Date.now().toString().slice(-7),
          user: currentUser || "Guest",
          date: new Date().toLocaleString(),
          status: payment === "Bank transfer" ? "Pending review" : "Reserved",
          items: cart.map(item => ({
            name: item.name,
            category: item.category,
            price: item.price
          })),
          subtotal: checkoutSubtotal,
          delivery,
          grandTotal,
          payment,
          email,
          emailMessage,
          phone: fullPhone,
          city,
          address,
          deliveryLabel: deliverySelect.options[deliverySelect.selectedIndex].text,
          deliveryDate,
          note: document.getElementById("orderNote").value.trim()
        };
        saveOrder(order);

        const paymentMessage = payment === "Bank transfer"
          ? `Reserved ${cart.length} item(s) for ${formatMoney(grandTotal)}. Delivery bot picked ${deliveryDate}. Receipt message saved for ${email}.`
          : `Reserved ${cart.length} item(s) for ${formatMoney(grandTotal)}. Delivery bot picked ${deliveryDate}. Receipt message saved for ${email}.`;
        notify("Order placed", paymentMessage, "success");
        appendChatMessage(`Delivery bot: your estimated delivery date is ${deliveryDate}. A receipt message has been prepared for ${email}.`, "bot");

        cart = [];
        updateCart();

        setTimeout(() => {
          document.getElementById("checkoutPage").classList.add("hidden");
          document.getElementById("app").classList.remove("hidden");
        }, 900);
      }, 900);
    }

    function backToShop() {
      document.getElementById("checkoutPage").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
    }
