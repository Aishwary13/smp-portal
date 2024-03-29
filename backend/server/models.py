from django.db import models

# Create your models here.

class Candidate(models.Model):
    id = models.CharField(primary_key=True)
    email = models.CharField()
    name = models.CharField()
    department = models.CharField()
    year = models.CharField()
    status = models.IntegerField()
    contact = models.CharField()
    """
    1 - Form filled 
    2 - mentor selected and consent form mail send 
    3 - Consent form filled
    4 - rejected
    5 - mentee assigned 
    -1 - anyother
    """
    size = models.CharField()
    score = models.CharField()
    imgSrc = models.TextField()

    def __str__(self):
        return self.id

    class Meta:
        app_label = 'server'

class Mentee(models.Model):
    id = models.CharField(primary_key=True)
    email = models.CharField()
    name = models.CharField()
    department = models.CharField()
    contact = models.CharField()
    imgSrc = models.TextField()
    mentorId = models.CharField() # id of the mentor

    def __str__(self):
        return self.id
    
    class Meta:
        app_label = 'server'


class Admin(models.Model):
    id = models.CharField(primary_key=True)
    email = models.CharField()
    name = models.CharField()
    department = models.CharField()
    phone = models.CharField()
    address = models.CharField()
    imgSrc = models.TextField()

    def __str__(self):
        return self.id
    
    class Meta:
        app_label = 'server'

class Meetings(models.Model):
    meetingId = models.AutoField(primary_key=True)  
    schedulerId = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    date = models.CharField(max_length=255)
    time = models.CharField(max_length=255)
    attendee = models.IntegerField()
    mentorBranches = models.JSONField(default=list)
    menteeBranches = models.JSONField(default=list)
    menteeList = models.JSONField(default=list)
    """
    1: mentor 
    2: mentee
    3: both 
    """
    description = models.TextField()

    def __str__(self):
        return str(self.meetingId)
    
    class Meta:
        app_label = 'server'

class Attendance(models.Model):
    id = models.AutoField(primary_key=True)
    attendeeId = models.CharField()
    meetingId = models.JSONField(null=True)

    def __str__(self):
        return self.id
    
    class Meta:
        app_label = 'server'

class FormResponses(models.Model):
    SubmissionId = models.AutoField(primary_key=True)
    submitterId = models.CharField()
    FormType =  models.CharField()
    """
    1: mentor enrollment 
    2: mentor consent 
    3: mentee feedback 
    """
    responses = models.JSONField(null=True)

    def __str__(self):
        return self.SubmissionId
    
    class Meta:
        app_label = 'server'

class FormStatus(models.Model):
    formId = models.CharField(primary_key=True)
    """
    1: mentor enrollment 
    2: mentor consent 
    3: mentee feedback 
    """
    formStatus = models.CharField()
    """
    0 : off 
    1 : on"""

    def __str__(self):
        return self.formId
    
    class Meta:
        app_label = 'server'
