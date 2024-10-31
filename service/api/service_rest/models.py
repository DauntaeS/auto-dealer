from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField()

class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.PositiveIntegerField(unique=True)

class Appointment(models.Model):
    status_choices = [
        ("canceled", "canceled"),
        ("finished", "finished"),
        ("created", "created")
    ]
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=50, choices=status_choices, default="created")
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )

    def cancel(self):
        self.status="canceled"
        self.save()

    def finish(self):
        self.status="finished"
        self.save()

    def str(self):
        return self.customer
