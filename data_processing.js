// data_processing.js - Helper functions for data processing

// Helper function to get data by type and category
function AN_getDataByType(type, category = 'all') {
    if (category === 'all') {
        return AN_data.filter(item => item.type === type);
    }
    return AN_data.filter(item => item.type === type && item.category === category);
}

// Helper function to get data by ID
function AN_getDataById(id) {
    return AN_data.find(item => item.id === id);
}

// Updated function to format date in Tunisian format (DD/MM/YYYY)
function AN_formatDate(dateString, language = 'en') {
    const date = new Date(dateString);
    
    // Different date formats for different languages
    if (language === 'ar') {
        // Arabic: Use Islamic calendar or Gregorian with Tunisian format
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else if (language === 'fr') {
        // French: Use European format
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } else {
        // English: Use Tunisian format (DD/MM/YYYY)
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}

// Function to get month name from date (updated for Tunisian context)
function AN_getMonthName(dateString, language = 'en') {
    const date = new Date(dateString);
    const month = date.getMonth();
    
    const monthNames = {
        en: ['January', 'February', 'March', 'April', 'May', 'June', 
             'July', 'August', 'September', 'October', 'November', 'December'],
        fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
             'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        ar: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 
             'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    };
    
    return monthNames[language] ? monthNames[language][month] : monthNames.en[month];
}

// Function to get day from date
function AN_getDay(dateString) {
    const date = new Date(dateString);
    return date.getDate().toString().padStart(2, '0');
}