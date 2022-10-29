from django.db import models

# Create your models here.
class Task(models.Model):
    descr = models.CharField(max_length=256)
    completed = models.BooleanField()

    def __str__(self):
        return f'Task #{self.id} : {self.descr} ({"completed" if self.completed else "Todo"})'