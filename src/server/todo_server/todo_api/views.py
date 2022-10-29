
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict
# For testing on Postman
from django.views.decorators.csrf import csrf_exempt   
import json

# connection to DB
from todo_api import models

# Create your views here.

@csrf_exempt
def tasks(request):
    if request.method == "GET":
        tasks = list(models.Task.objects.values())
        return JsonResponse(tasks,safe=False,status=200)
    elif request.method == "POST":
        val_dict = json.loads(request.body)
        if("descr" in val_dict and val_dict["descr"]!="" and "completed" in val_dict 
            and str(val_dict["completed"]).lower() in ['true','false']):
            try:
                new_line = models.Task(**val_dict)
                
                new_line.save()
                # Prepare response
                resp = JsonResponse(val_dict,status = 200)
                return resp
            except:
                return HttpResponseBadRequest("Failed adding task")
            
        else:
            return HttpResponseBadRequest("Task incorrectly formatted")
    else:
        return HttpResponseBadRequest("Use GET or POST with tasks request")

@csrf_exempt
def task_detailed(request,key_val):
    try:
        task = models.Task.objects.get(id=key_val)
    except ObjectDoesNotExist:
        return JsonResponse({"status": f"There is no task with id {key_val}"}, status=404)

    if request.method == "DELETE":
        try:
            task.delete()
            return HttpResponse(status=204)
        except ObjectDoesNotExist:
            return HttpResponseBadRequest("Could not find key {} in task list".format(key_val))
    elif request.method == "PUT":
        try:
            # Modifies a task, not used currently
            updated_task = json.loads(request.body)
            task.__dict__.update(updated_task)
            task.save()
            return JsonResponse(updated_task, status=201) 
        except:
            return HttpResponseBadRequest(f"Could not put task {key_val}")
    else:
        return HttpResponseBadRequest("Use DELETE or PUT with task request")
        



