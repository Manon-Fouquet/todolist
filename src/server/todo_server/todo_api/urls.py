from django.urls import path

from . import views

urlpatterns = [
    path('hello/', views.hello_world),
    path('add',views.add_task),
    path('delete/<int:key_val>',views.delete_task),
    path('tasks',views.tasks),
]