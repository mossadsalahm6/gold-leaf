// Booking page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const formContainers = document.querySelectorAll('.form-container');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            formContainers.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding form
            const targetForm = document.getElementById(targetTab + '-form');
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });

    // Set minimum date to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });

    // Form validation
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            const errorMsg = field.parentNode.querySelector('.error-message');
            
            if (!field.value.trim()) {
                field.classList.add('error');
                if (errorMsg) {
                    errorMsg.classList.add('show');
                } else {
                    const error = document.createElement('div');
                    error.className = 'error-message show';
                    error.textContent = 'هذا الحقل مطلوب';
                    field.parentNode.appendChild(error);
                }
                isValid = false;
            } else {
                field.classList.remove('error');
                if (errorMsg) {
                    errorMsg.classList.remove('show');
                }
            }
        });

        // Validate email format
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value && !isValidEmail(field.value)) {
                field.classList.add('error');
                let errorMsg = field.parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    field.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
                errorMsg.classList.add('show');
                isValid = false;
            }
        });

        // Validate phone format
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value && !isValidPhone(field.value)) {
                field.classList.add('error');
                let errorMsg = field.parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    field.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'يرجى إدخال رقم هاتف صحيح';
                errorMsg.classList.add('show');
                isValid = false;
            }
        });

        // Validate service selection
        const serviceCheckboxes = form.querySelectorAll('input[name="services[]"]');
        const hasSelectedService = Array.from(serviceCheckboxes).some(cb => cb.checked);
        
        if (!hasSelectedService) {
            const serviceContainer = form.querySelector('.service-options');
            let errorMsg = serviceContainer.parentNode.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                serviceContainer.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = 'يرجى اختيار خدمة واحدة على الأقل';
            errorMsg.classList.add('show');
            isValid = false;
        } else {
            const errorMsg = form.querySelector('.service-options').parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.classList.remove('show');
            }
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    // Clear validation errors on input
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.classList.remove('show');
            }
        });
    });

    // Handle consultation form submission
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    showSuccessModal();
                    this.reset();
                }, 2000);
            }
        });
    }

    // Handle quote form submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    showSuccessModal();
                    this.reset();
                }, 2000);
            }
        });
    }

    // File upload handling
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileUpload = this.parentNode;
            const fileUploadContent = fileUpload.querySelector('.file-upload-content');
            
            if (this.files.length > 0) {
                const fileNames = Array.from(this.files).map(file => file.name).join(', ');
                fileUploadContent.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>تم اختيار ${this.files.length} ملف</p>
                    <span>${fileNames}</span>
                `;
                fileUpload.style.borderColor = '#28a745';
                fileUploadContent.querySelector('i').style.color = '#28a745';
            }
        });
    });

    // Success modal functionality
    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';
        
        // Close modal when clicking X
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
        
        // Close modal when clicking outside
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Auto close after 5 seconds
        setTimeout(() => {
            modal.style.display = 'none';
        }, 5000);
    }

    // Smooth scrolling for form sections
    const formContainerElements = document.querySelectorAll('.form-container');
    formContainerElements.forEach(container => {
        container.addEventListener('animationend', function() {
            this.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Dynamic city field handling
    const citySelects = document.querySelectorAll('select[name="city"]');
    citySelects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value === 'other') {
                // Create custom input for other city
                const customInput = document.createElement('input');
                customInput.type = 'text';
                customInput.name = 'custom_city';
                customInput.placeholder = 'اكتب اسم المدينة';
                customInput.required = true;
                customInput.style.marginTop = '10px';
                
                // Insert after the select
                this.parentNode.appendChild(customInput);
                customInput.focus();
            } else {
                // Remove custom input if exists
                const customInput = this.parentNode.querySelector('input[name="custom_city"]');
                if (customInput) {
                    customInput.remove();
                }
            }
        });
    });

    // Form data collection for submission
    function collectFormData(form) {
        const formData = new FormData(form);
        const data = {};
        
        // Collect regular form fields
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Collect selected services
        const selectedServices = [];
        const serviceCheckboxes = form.querySelectorAll('input[name="services[]"]:checked');
        serviceCheckboxes.forEach(cb => {
            selectedServices.push(cb.value);
        });
        data.services = selectedServices;
        
        return data;
    }

    // Auto-save form data to localStorage
    function autoSaveForm(form) {
        const formId = form.id;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                const formData = collectFormData(form);
                localStorage.setItem(`booking_${formId}`, JSON.stringify(formData));
            });
        });
    }

    // Restore form data from localStorage
    function restoreFormData(form) {
        const formId = form.id;
        const savedData = localStorage.getItem(`booking_${formId}`);
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                // Restore regular fields
                Object.keys(data).forEach(key => {
                    if (key !== 'services') {
                        const field = form.querySelector(`[name="${key}"]`);
                        if (field) {
                            field.value = data[key];
                        }
                    }
                });
                
                // Restore service checkboxes
                if (data.services && Array.isArray(data.services)) {
                    data.services.forEach(service => {
                        const checkbox = form.querySelector(`input[name="services[]"][value="${service}"]`);
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    });
                }
            } catch (e) {
                console.error('Error restoring form data:', e);
            }
        }
    }

    // Initialize auto-save and restore for both forms
    if (consultationForm) {
        autoSaveForm(consultationForm);
        restoreFormData(consultationForm);
    }
    
    if (quoteForm) {
        autoSaveForm(quoteForm);
        restoreFormData(quoteForm);
    }

    // Clear saved data on successful submission
    function clearSavedData(formId) {
        localStorage.removeItem(`booking_${formId}`);
    }

    // Add to form submission handlers
    if (consultationForm) {
        const originalHandler = consultationForm.onsubmit;
        consultationForm.addEventListener('submit', function(e) {
            if (validateForm(this)) {
                clearSavedData(this.id);
            }
        });
    }

    if (quoteForm) {
        const originalHandler = quoteForm.onsubmit;
        quoteForm.addEventListener('submit', function(e) {
            if (validateForm(this)) {
                clearSavedData(this.id);
            }
        });
    }

    // Add animation to form elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe form groups for animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.6s ease-out';
        observer.observe(group);
    });
});

