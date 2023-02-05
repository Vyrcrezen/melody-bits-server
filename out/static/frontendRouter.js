/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/pages/frontend-router.ts ***!
  \**************************************/

var reroutTraffic = function () {
    var body = document.querySelector('body');
    if (!body) {
        return;
    }
    console.log(window.location.href);
    var pageAddress = window.location.href.replace(/(.*?\/\/)*(.*?\/){1}/, '');
    var scriptedContent = document.createElement('script');
    console.log(pageAddress);
    if (pageAddress.includes('profile-')) {
        scriptedContent.setAttribute('src', '/profileOverviewPage.js');
    }
    else if (pageAddress.includes('submissions-')) {
        scriptedContent.setAttribute('src', '/profileSubmissionsPage.js');
    }
    else if (pageAddress.includes('music-edit-')) {
        scriptedContent.setAttribute('src', '/musicEditPage.js');
    }
    else {
        switch (pageAddress) {
            case 'index':
                scriptedContent.setAttribute('src', '/indexpage.js');
                break;
            case 'about':
                scriptedContent.setAttribute('src', '/aboutPage.js');
                break;
            case 'login':
                scriptedContent.setAttribute('src', '/loginPage.js');
                break;
            case 'music-browser':
                scriptedContent.setAttribute('src', '/musicBrowserPage.js');
                break;
            case 'music-approve':
                scriptedContent.setAttribute('src', '/musicApprovePage.js');
                break;
            case 'register':
                scriptedContent.setAttribute('src', '/RegisterPage.js');
                break;
            case 'music-upload':
                scriptedContent.setAttribute('src', '/musicUploadPage.js');
                break;
            case 'privacy-policy':
                scriptedContent.setAttribute('src', '/privacyPolicyPage.js');
                break;
            case 'terms-and-rules':
                scriptedContent.setAttribute('src', '/termsAndRulesPage.js');
                break;
            default: scriptedContent.setAttribute('src', '/notFound.js');
        }
    }
    body.appendChild(scriptedContent);
};
reroutTraffic();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbnRlbmRSb3V0ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLElBQU0sYUFBYSxHQUFHO0lBQ2xCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFNUMsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNQLE9BQU87S0FDVjtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUUsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUUsSUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6RCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXpCLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNsQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0tBQ2xFO1NBQ0ksSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzNDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLDRCQUE0QixDQUFDLENBQUM7S0FDckU7U0FDSSxJQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDekMsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztLQUM1RDtTQUNJO1FBQ0QsUUFBUSxXQUFXLEVBQUU7WUFDakIsS0FBSyxPQUFPO2dCQUFFLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1lBQ04sS0FBSyxPQUFPO2dCQUFFLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1lBQ04sS0FBSyxPQUFPO2dCQUFFLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNuRSxNQUFNO1lBQ04sS0FBSyxlQUFlO2dCQUFFLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2xGLE1BQU07WUFDTixLQUFLLGVBQWU7Z0JBQUUsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztnQkFDbEYsTUFBTTtZQUNOLEtBQUssVUFBVTtnQkFBRSxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNO1lBQ04sS0FBSyxjQUFjO2dCQUFFLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLHFCQUFxQixDQUFDLENBQUM7Z0JBQ2hGLE1BQU07WUFDTixLQUFLLGdCQUFnQjtnQkFBRSxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNwRixNQUFNO1lBQ04sS0FBSyxpQkFBaUI7Z0JBQUUsZUFBZSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztnQkFDckYsTUFBTTtZQUNOLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ2hFO0tBQ0o7SUFHRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXRDLENBQUM7QUFFRCxhQUFhLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYi1tdXNpYy1jbGllbnQvLi9zcmMvcGFnZXMvZnJvbnRlbmQtcm91dGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCByZXJvdXRUcmFmZmljID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuXHJcbiAgICBpZiAoIWJvZHkpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2cod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gICAgY29uc3QgcGFnZUFkZHJlc3MgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKCAvKC4qP1xcL1xcLykqKC4qP1xcLyl7MX0vLCAnJyk7XHJcbiAgICBjb25zdCBzY3JpcHRlZENvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhwYWdlQWRkcmVzcyk7XHJcblxyXG4gICAgaWYgKHBhZ2VBZGRyZXNzLmluY2x1ZGVzKCdwcm9maWxlLScpKSB7XHJcbiAgICAgICAgc2NyaXB0ZWRDb250ZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy9wcm9maWxlT3ZlcnZpZXdQYWdlLmpzJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChwYWdlQWRkcmVzcy5pbmNsdWRlcygnc3VibWlzc2lvbnMtJykpIHtcclxuICAgICAgICBzY3JpcHRlZENvbnRlbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL3Byb2ZpbGVTdWJtaXNzaW9uc1BhZ2UuanMnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYocGFnZUFkZHJlc3MuaW5jbHVkZXMoJ211c2ljLWVkaXQtJykpIHtcclxuICAgICAgICBzY3JpcHRlZENvbnRlbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL211c2ljRWRpdFBhZ2UuanMnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHN3aXRjaCAocGFnZUFkZHJlc3MpIHtcclxuICAgICAgICAgICAgY2FzZSAnaW5kZXgnOiBzY3JpcHRlZENvbnRlbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL2luZGV4cGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWJvdXQnOiBzY3JpcHRlZENvbnRlbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL2Fib3V0UGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbG9naW4nOiBzY3JpcHRlZENvbnRlbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL2xvZ2luUGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXVzaWMtYnJvd3Nlcic6IHNjcmlwdGVkQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvbXVzaWNCcm93c2VyUGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXVzaWMtYXBwcm92ZSc6IHNjcmlwdGVkQ29udGVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsICcvbXVzaWNBcHByb3ZlUGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmVnaXN0ZXInOiBzY3JpcHRlZENvbnRlbnQuc2V0QXR0cmlidXRlKCdzcmMnLCAnL1JlZ2lzdGVyUGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbXVzaWMtdXBsb2FkJzogc2NyaXB0ZWRDb250ZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy9tdXNpY1VwbG9hZFBhZ2UuanMnKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ByaXZhY3ktcG9saWN5Jzogc2NyaXB0ZWRDb250ZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy9wcml2YWN5UG9saWN5UGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndGVybXMtYW5kLXJ1bGVzJzogc2NyaXB0ZWRDb250ZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy90ZXJtc0FuZFJ1bGVzUGFnZS5qcycpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDogc2NyaXB0ZWRDb250ZW50LnNldEF0dHJpYnV0ZSgnc3JjJywgJy9ub3RGb3VuZC5qcycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgYm9keS5hcHBlbmRDaGlsZChzY3JpcHRlZENvbnRlbnQpO1xyXG4gICAgXHJcbn1cclxuXHJcbnJlcm91dFRyYWZmaWMoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=