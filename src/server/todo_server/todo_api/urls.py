from django.urls import path

from . import views

urlpatterns = [
    path('task/<int:key_val>',views.task_detailed),
    path('tasks',views.tasks),
]